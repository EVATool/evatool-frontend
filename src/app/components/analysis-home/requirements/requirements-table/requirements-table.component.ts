import {Component, OnInit, ViewChild} from '@angular/core';
import {Requirement} from "../../../../model/Requirement";
import {Impact} from "../../../../model/Impact";
import {VariantsDialogComponent} from "../variants-dialog/variants-dialog.component";
import {Value} from "../../../../model/Value";
import {RequirementDelta} from "../../../../model/RequirementDelta";
import {RequirementTableFilterEvent} from "../requirements-filter-bar/RequirementTableFilterEvent";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {RequirementDataService} from "../../../../services/data/requirement-data.service";
import {MatSort} from "@angular/material/sort";
import {NgScrollbar} from "ngx-scrollbar";
import {LogService} from "../../../../services/log.service";
import {ImpactDataService} from "../../../../services/data/impact-data.service";
import {ValueDataService} from "../../../../services/data/value-data.service";
import {AnalysisDataService} from "../../../../services/data/analysis-data.service";
import {RequirementDeltaDataService} from "../../../../services/data/requirement-delta-data.service";
import {VariantDataService} from "../../../../services/data/variant-data.service";
import {SliderFilterSettings} from "../../../impact-slider/SliderFilterSettings";
import {Variant} from "../../../../model/Variant";
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-requirements-table',
  templateUrl: './requirements-table.component.html',
  styleUrls: ['./requirements-table.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({opacity: 0}),
            animate('250ms ease-out',
              style({opacity: 1}))
          ]
        ),
        transition(
          ':leave',
          [
            style({opacity: 1}),
            animate('250ms ease-out',
              style({opacity: 0}))
          ]
        )
      ]
    )
  ]
})
export class RequirementsTableComponent implements OnInit {
  @ViewChild(NgScrollbar) scrollbarRef!: NgScrollbar;
  @ViewChild(MatTable) table!: MatTable<Impact>;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  staticDisplayedColumns = ['prefixSequenceId', 'description', 'variants', 'values', 'delete-button'];
  displayedColumns: string[] = [];
  tableDataSource = new MatTableDataSource<Requirement>();
  windowScrolled = false;
  highlightFilter = '';

  constructor(
    private logger: LogService,
    public requirementDataService: RequirementDataService,
    public requirementDeltaDataService: RequirementDeltaDataService,
    public impactDataService: ImpactDataService,
    public valueDataService: ValueDataService,
    public analysisDataService: AnalysisDataService,
    public variantDataService: VariantDataService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.impactDataService.loadedImpacts.subscribe((impacts: Impact[]) => {
      this.updateImpactColumns();
    });
    this.impactDataService.createdImpact.subscribe((impact: Impact) => {
      this.updateImpactColumns();
    });
    this.impactDataService.deletedImpact.subscribe((impact: Impact) => {
      this.updateImpactColumns();
    });
    this.updateImpactColumns();

    this.requirementDataService.loadedRequirements.subscribe((requirements: Requirement[]) => {
      this.updateTableDataSource();
    });
    this.requirementDataService.createdRequirement.subscribe((requirement: Requirement) => {
      this.updateTableDataSource();
    });
    this.requirementDataService.deletedRequirement.subscribe((requirement: Requirement) => {
      this.updateTableDataSource();
    });
    this.updateTableDataSource();

    // TODO what about timing and the loading of RequirementDeltas?
    this.requirementDeltaDataService.createdRequirementDelta.subscribe((delta: RequirementDelta) => {
      this.showDeltaSlider(delta);
    });

  }

  updateImpactColumns(excludeImpacts?: string[]): void {
    const displayedColumns: string[] = [];
    this.staticDisplayedColumns.forEach((col: string) => displayedColumns.push(col));

    this.impactDataService.impacts.forEach((impact: Impact) => {
      //displayedColumns.push(impact.prefixSequenceId);
      const index = displayedColumns.length - 1;
      if (excludeImpacts == null || !excludeImpacts.includes(impact.prefixSequenceId)) {
        displayedColumns.splice(index, 0, impact.prefixSequenceId);
      }
    });

    this.displayedColumns = displayedColumns;
  }

  updateTableDataSource(): void {
    this.tableDataSource.data = this.requirementDataService.requirements;
  }

  ngAfterViewInit(): void {
    this.scrollbarRef.scrolled.subscribe(e => {
      this.windowScrolled = e.target.scrollTop !== 0;
    });

    this.initSorting();
    this.initFiltering();
  }

  scrollToTop(): void {
    this.logger.info(this, 'Scroll To Top');
    const options = {top: 0, duration: 250};
    this.scrollbarRef.scrollTo(options);
  }

  initSorting(): void {
    this.logger.info(this, 'Init Sorting');
    this.tableDataSource.sort = this.sort;
    this.tableDataSource.sortingDataAccessor = (requirement, property) => {
      if (property.includes('IMP')) { // Return impact merit or delta overwrite merit (if it exists) for impact columns
        const impact = this.impactDataService.impacts.find(imp => imp.prefixSequenceId === property);
        let val = -10;
        if (impact != null) {
          const delta = this.getRequirementDelta(requirement, impact);
          if (delta == null) {
            val = impact.merit;
          } else {
            val = delta.overwriteMerit;
          }
        }
        return val;
      }

      switch (property) {
        case 'values':
          return this.getAffectedValues(requirement).join(',');
        case 'variants':
          //return requirement.variants.map(variant => variant.name).join(',');
          return requirement.variants.length;
        default:
          return requirement[property];
      }
    };
  }

  initFiltering(): void {
    this.tableDataSource.filterPredicate = this.createFilterPredicate();
  }

  createFilterPredicate(): (data: any, filter: string) => boolean {
    return (data: Requirement, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      const variantNames = data.variants.map((v: Variant) => v.name);
      const variantFilter = searchTerms.variant.length === 0 || searchTerms.variant.every((s: string) => variantNames.includes(s));

      const valueNames = this.getAffectedValues(data);
      const valueFilter = searchTerms.value.length === 0 || searchTerms.value.every((s: string) => valueNames.includes(s));

      let meritFilter = true;
      const deltas = this.getRequirementDeltas(data);
      deltas.forEach((delta: RequirementDelta) => {
        const minValue = Math.min(searchTerms.merit.sliderFilterValues[0], searchTerms.merit.sliderFilterValues[1]);
        const maxValue = Math.max(searchTerms.merit.sliderFilterValues[0], searchTerms.merit.sliderFilterValues[1]);
        if (delta.overwriteMerit !== null && !(delta.overwriteMerit >= minValue && delta.overwriteMerit <= maxValue)) {
          meritFilter = false;
        }
      });

      return variantFilter && valueFilter && meritFilter;
    };
  }

  updateFilter(event: RequirementTableFilterEvent): void {
    this.highlightFilter = event.highlight;
    this.updateImpactColumns(event.impact);
    this.tableDataSource.filter = JSON.stringify(event);
  }

  createRequirement(): void {
    const requirement = this.requirementDataService.createDefaultRequirement(
      this.analysisDataService.currentAnalysis);
    this.requirementDataService.createRequirement(requirement);
  }

  updateRequirement(requirement: Requirement): void {
    this.requirementDataService.updateRequirement(requirement);
  }

  deleteRequirement(requirement: Requirement): void {
    this.requirementDataService.deleteRequirement(requirement);
  }

  createRequirementDelta(delta: RequirementDelta): void {
    this.requirementDeltaDataService.createRequirementDelta(delta);
  }

  updateRequirementDelta(delta: RequirementDelta): void {
    this.requirementDeltaDataService.updateRequirementDelta(delta);
  }

  deleteRequirementDelta(delta: RequirementDelta): void {
    this.requirementDeltaDataService.deleteRequirementDelta(delta);
  }

  showDeltaSliderIfExistsElseCreate(requirement: Requirement, impact: Impact): void {
    const delta = this.getRequirementDelta(requirement, impact);
    if (delta != null) {
      this.showDeltaSlider(delta);
    } else {
      const newDelta = this.requirementDeltaDataService.createDefaultRequirementDelta(impact, requirement);
      this.createRequirementDelta(newDelta);
    }
  }

  showDeltaSlider(delta: RequirementDelta): void {
    delta.visible = true;
  }

  deltaMouseEnter(requirement: Requirement, impact: Impact): void {
    const delta = this.getRequirementDelta(requirement, impact);
    if (delta != null) {
      delta.hover = true;
    }
  }

  deltaMouseLeave(requirement: Requirement, impact: Impact): void {
    const delta = this.getRequirementDelta(requirement, impact);
    if (delta != null) {
      delta.hover = false;
    }
  }

  hideDeltaSlider(requirement: Requirement, impact: Impact): void {
    const delta = this.getRequirementDelta(requirement, impact);
    if (delta != null) {
      delta.visible = false;
    }
  }

  hideDeltaSliders(requirement: Requirement): void {
    const deltas = this.getRequirementDeltas(requirement);
    for (let i = 0; i < deltas.length; i++) {
      let delta: RequirementDelta = deltas[i];
      delta.visible = false;
    }
  }

  openVariantsDialog(): void {
    const dialogref = this.dialog.open(VariantsDialogComponent, {
      height: '60%',
      width: '50%',
      data: {id: ''}
    });
  }

  getAffectedValues(requirement: Requirement): string[] {
    const values: Value[] = [];

    this.requirementDeltaDataService.requirementDeltas.forEach((delta: RequirementDelta) => {
      if (delta.requirement === requirement) {
        if (!values.includes(delta.impact.value)) {
          values.push(delta.impact.value);
        }
      }
    });

    return values.map(value => value.name);
  }

  getRequirementDelta(requirement: Requirement, impact: Impact): RequirementDelta | null {
    const deltaOrNull = this.requirementDeltaDataService.requirementDeltas.filter(
      delta => delta.requirement === requirement && delta.impact === impact);
    if (deltaOrNull.length === 0) { // There is no connection yet.
      return null;
    }
    return deltaOrNull[0]; // There is only ever one element.
  }

  getRequirementDeltas(requirement: Requirement) {
    return this.requirementDeltaDataService.requirementDeltas.filter(
      delta => delta.requirement === requirement
    );
  }

  // TODO DELETE AFTER HERE!!
  //
  // private createFilter(): (data: any, filter: string) => boolean {
  //   return (data: Impact, filter: string): boolean => {
  //     const search = JSON.parse(filter);
  //
  //     const variantsTitles = data.variantsTitle.map((v: Variant) => v.variantsTitle);
  //     const variantsFilter = search.variants.length === 0 || search.variants.every((s: string) => variantsTitles.includes(s));
  //
  //     const valueTitles = data.values.map((v: Value) => v.valueTitle);
  //     const valueSystemFilter = search.valueSystem.length === 0 || search.valueSystem.every((s: string) => valueTitles.includes(s));
  //
  //     let valueFilter = true;
  //     const impactTitles = data.requirementImpactPoints.map((imp: RequirementDelta) => imp.entityId);
  //     data.requirementImpactPoints.forEach((s: RequirementDelta) => {
  //       const minValue = Math.min(search.value.sliderFilterValues[0], search.value.sliderFilterValues[1]);
  //       const maxValue = Math.max(search.value.sliderFilterValues[0], search.value.sliderFilterValues[1]);
  //       if (s.points !== null && !(s.points >= minValue && s.points <= maxValue)) {
  //         valueFilter = false;
  //       }
  //     });
  //     const impactFilter = search.impacts.length === 0 //||
  //     //search.impacts.every((s: string) => impactTitles.includes(this.impactSoureces.find(e => e.prefixSequenceId === s)?.id));
  //     return variantsFilter && valueSystemFilter && valueFilter && impactFilter;
  //   };
  // }
  //
  //
  // updateColumns(): void {
  //   this.impactsToShow = this.filterValues.impacts;
  //   this.displayedColumns = this.getDisplayedColumns();
  // }
  //
  // getDisplayedColumns(): string[] {
  //   const defaultColumns: string[] = ['prefixSequenceId', 'requirementDescription', 'variantsTitle', 'values'];
  //   return this.columnDefinitions
  //     .filter(cd => this.impactsToShow.length === 0 || defaultColumns.includes(cd.def) || this.impactsToShow.includes(cd.def))
  //     .map(cd => cd.def);
  // }
  //
  // fillValuesColumn(parameter: any): string {
  //   let retValue = '';
  //   const values: Value[] = parameter.values;
  //   if (values == null) {
  //     return retValue;
  //   }
  //   values.forEach(value1 => retValue = retValue.concat(value1.valueTitle, '\n'));
  //   return retValue;
  // }
  //
  // isPositivOrNegativ(element: Requirement, impact: Impact, positiv: boolean): boolean {
  //   if (element.requirementImpactPoints == null || element.requirementImpactPoints.length === 0) {
  //     return false;
  //   }
  //   let retValue = false;
  //   element.requirementImpactPoints.forEach((value: Value) => {
  //     if (value.entityId === impact.id) {
  //       const points: number | null = value.points;
  //       if ((positiv && points && 0 < points) || (points && 0 > points)) {
  //         retValue = true;
  //       }
  //     }
  //   });
  //   return retValue;
  // }
  //
  // setSliderVisible(element: Requirement, impact: Impact): void {
  //   const toRemove = this.showElementSlider.find(value => value.req === element.rootEntityId && value.imp === impact.id);
  //   if (toRemove != null) {
  //     const index = this.showElementSlider.indexOf(toRemove, 0);
  //     if (index > -1) {
  //       this.showElementSlider.splice(index, 1);
  //     }
  //   } else {
  //     this.showElementSlider.push({req: element.rootEntityId, imp: impact.id});
  //   }
  // }
  //
  // valueChange(element: Requirement, impact: Impact, event: MatSliderChange): void {
  //   if (event.value !== null) {
  //     if (event.value === impact.merit) {
  //       const toDelete: RequirementDelta | undefined = element.requirementImpactPoints.find((value: Value) => value.entityId === impact.id);
  //       if (toDelete != null) {
  //         const index = element.requirementImpactPoints.indexOf(toDelete, 0);
  //         if (index > -1) {
  //           element.requirementImpactPoints.splice(index, 1);
  //         }
  //       }
  //     } else {
  //       let found = false;
  //       element.requirementImpactPoints.forEach((value: Value) => {
  //         if (value.entityId === impact.id) {
  //           value.points = event.value;
  //           found = true;
  //         }
  //       });
  //       if (!found) {
  //         // const newPoint: RequirementDelta = {
  //         //   points: event.value,
  //         //   entityId: impact.id,
  //         //   impactDescription: impact.description,
  //         // };
  //         // element.requirementImpactPoints.push(newPoint);
  //       }
  //     }
  //   }
  //   this.updateRequirement(element);
  // }
  //
  // descriptionChange(requirements: Requirement): void {
  //   this.updateRequirement(requirements);
  // }
  //
  // deleteRequirement(requirements: Requirement): void {
  //   this.requirementDataService.deleteRequirement(requirements);
  // }
  //
  // updateRequirement(requirements: Requirement): void {
  //   //this.requirementsDataService.updateRequirements(requirements); // TODO
  // }
  //
  // testKeyPress(event: any): void {
  //   if (event.ctrlKey && event.keyCode === 10) {
  //     //this.requirementsDataService.copyRequirement(this.selectedRequirements); // TODO
  //   }
  // }
  //
  // getSelectedRequirment(requirements: Requirement): void {
  //   this.selectedRequirements = requirements;
  // }
  //
  // variantsChange(element: Requirement, $event: any): void {
  //   const variantId: string = $event.value;
  //   const variant: Variant = new Variant();
  //   variant.entityId = variantId;
  //   element.variantsTitle = [variant];
  //   this.updateRequirement(element);
  // }
  //
  // checkAchrivedAndOpenDialog(variantsTitleElement: Variant[]): void {
  //   if (variantsTitleElement.length > 0 && variantsTitleElement[0].archived) {
  //     this.dialog.open(VariantsDialogComponent, {data: {id: '' + variantsTitleElement[0].entityId}});
  //   }
  // }
  //
  // valueForCell(element: Requirement, impact: Impact): number {
  //   let retValue = 0;
  //   const found = element.requirementImpactPoints.find((value: Value) => value.entityId === impact.id);
  //   if (!found) {
  //     retValue = impact.merit;
  //   } else {
  //     retValue = (found.points as number);
  //   }
  //   return retValue;
  // }
  //
  // show(element: Requirement, impact: Impact): boolean {
  //   return this.showElementSlider.some(se => se.req === element.rootEntityId && se.imp === impact.id);
  // }
  //
  // reload(): void {
  //   // clear the Arrays from the old imp
  //
  //   // this.displayedColumns = this.displayedColumns.filter(value => !value.startsWith('IMP')); // TODO
  //   // this.columnDefinitions = this.columnDefinitions.filter(value => !value.def.startsWith('IMP'));
  //   // this.impactRestService.getImpacts(this.analysisId).subscribe((result: any) => {
  //   //   this.impactSoureces = [];
  //   //   result.forEach((impactRest: Impact) => {
  //   //     const impact: Impact = {
  //   //       id: impactRest.id,
  //   //       prefixSequenceId: impactRest.prefixSequenceId,
  //   //       description: impactRest.description,
  //   //       value: impactRest.value,
  //   //       valueSystem: impactRest.valueSystem
  //   //     };
  //   //     this.impactSoureces.push(impact);
  //   //   });
  //   //   let impactIdList: string[] = [];
  //   //   this.impactSoureces.forEach(value => {
  //   //     impactIdList = impactIdList.concat(value.prefixSequenceId);
  //   //     this.columnDefinitions.push({def: value.prefixSequenceId, hide: true});
  //   //   });
  //   //   this.displayedColumns = this.displayedColumns.concat(impactIdList);
  //   // });
  // }
}
