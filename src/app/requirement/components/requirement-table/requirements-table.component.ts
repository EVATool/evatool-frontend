import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Requirements} from '../../models/Requirements';
import {Value} from '../../models/Value';
import {Impact} from '../../models/Impact';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {RequirementsDataService} from '../../services/requirements/requirements-data.service';
import {MatDialog} from '@angular/material/dialog';
import {Variants} from '../../models/Variants';
import {MatSliderChange} from '@angular/material/slider';
import {RequirementImpactPoints} from '../../models/RequirementImpactPoints';
import {RequirementTableFilterEvent} from '../requirement-table-filter-bar/RequirementTableFilterEvent';
import {VariantDialogComponent} from '../../../variant/components/variant-dialog/variant-dialog.component';
import {ImpactRestService} from '../../services/impact/impact-rest.service';
import {VariantsRestService} from '../../services/variants/variants-rest.service';

@Component({
  selector: 'app-requirement-table',
  templateUrl: './requirements-table.component.html',
  styleUrls: ['./requirements-table.component.scss', '../../../layout/style/style.scss']
})
export class RequirementsTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  displayedColumns: string[] = ['uniqueString', 'requirementDescription', 'variantsTitle', 'values'];
  requirementsSource: Requirements[] = [];
  impactSoureces: Impact[] = [];
  variantsSoureces: Variants[] = [];
  tableDatasource: MatTableDataSource<Requirements> = new MatTableDataSource<Requirements>();
  showElementSlider = [
    {req: '', imp: ''}
  ];
  columnDefinitions = [
    {def: 'uniqueString', hide: true},
    {def: 'requirementDescription', hide: true},
    {def: 'variantsTitle', hide: true},
    {def: 'values', hide: true}
  ];
  filterValues: any = {
    id: '',
    variants: [],
    valueSystem: [],
    impacts: [],
    value: '',
    description: '',
    highlight: ''
  };
  analysisId = '';
  private selectedRequirements: Requirements = new Requirements();
  private impactsToShow: string[] = [];

  constructor(public requirementsDataService: RequirementsDataService,
              private impactRestService: ImpactRestService,
              private variantsRestService: VariantsRestService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.router.routerState.root.queryParams.subscribe(params => {
      this.analysisId = params.id;
      this.requirementsDataService.loadedRequirements.subscribe((requirements: Requirements[]) => {
        this.tableDatasource = new MatTableDataSource<Requirements>(requirements);
        this.initSorting();
        this.initFiltering();
      });
      this.requirementsDataService.changedRequirements.subscribe((requirements: Requirements[]) => {
        this.tableDatasource.data = requirements;
      });
      this.requirementsDataService.addedRequirement.subscribe((requirements: Requirements) => {
        this.showElementSlider = [];
        this.impactSoureces.forEach(imp => {
          this.showElementSlider.push({req: requirements.rootEntityId, imp: imp.id});
        });
      });
      this.impactRestService.getImpacts(params.id).subscribe((result: any) => {
        this.impactSoureces = [];
        result.forEach((impactRest: Impact) => {
          const impact: Impact = {
            id: impactRest.id,
            uniqueString: impactRest.uniqueString,
            description: impactRest.description,
            value: impactRest.value,
            valueSystem: impactRest.valueSystem
          };
          this.impactSoureces.push(impact);
        });
        let impactIdList: string[] = [];
        this.impactSoureces.forEach(value => {
          impactIdList = impactIdList.concat(value.uniqueString);
          this.columnDefinitions.push({def: value.uniqueString, hide: true});
        });
        this.displayedColumns = this.displayedColumns.concat(impactIdList);
      });
      this.variantsRestService.getVariants(params.id).subscribe((result: any) => {
        this.variantsSoureces = [];
        result.forEach((variantsRest: Variants) => {
          const variants: Variants = {
            entityId: variantsRest.id,
            description: variantsRest.description,
            variantsTitle: variantsRest.title,
            archived: variantsRest.archived
          };
          this.variantsSoureces.push(variants);
        });
      });
    });
    this.tableDatasource.data = this.requirementsSource;
    this.requirementsDataService.onInit();
  }

  private initFiltering(): void {
    this.tableDatasource.filterPredicate = this.createFilter();
  }

  private updateFilter(): void {
    this.tableDatasource.filter = JSON.stringify(this.filterValues);
  }

  private createFilter(): (data: any, filter: string) => boolean {
    return (data: Impact, filter: string): boolean => {
      const search = JSON.parse(filter);

      const variantsTitles = data.variantsTitle.map((v: Variants) => v.variantsTitle);
      const variantsFilter = search.variants.length === 0 || search.variants.every((s: string) => variantsTitles.includes(s));

      const valueTitles = data.values.map((v: Value) => v.valueTitle);
      const valueSystemFilter = search.valueSystem.length === 0 || search.valueSystem.every((s: string) => valueTitles.includes(s));

      let valueFilter = true;
      const impactTitles = data.requirementImpactPoints.map((imp: RequirementImpactPoints) => imp.entityId);
      data.requirementImpactPoints.forEach((s: RequirementImpactPoints) => {
        const minValue = Math.min(search.value.sliderFilterValues[0], search.value.sliderFilterValues[1]);
        const maxValue = Math.max(search.value.sliderFilterValues[0], search.value.sliderFilterValues[1]);
        if (s.points !== null && !(s.points >= minValue && s.points <= maxValue)) {
          valueFilter = false;
        }
      });
      const impactFilter = search.impacts.length === 0 ||
        search.impacts.every((s: string) => impactTitles.includes(this.impactSoureces.find(e => e.uniqueString === s)?.id));
      return variantsFilter && valueSystemFilter && valueFilter && impactFilter;
    };
  }

  filterChange(event: RequirementTableFilterEvent): void {
    this.filterValues.highlight = event.highlightFilter;
    this.filterValues.value = event.valueFilter;
    this.filterValues.variants = event.variantsFilter;
    this.filterValues.valueSystem = event.valueSystemFilter;
    this.filterValues.impacts = event.impactFilter;
    this.updateFilter();
    this.updateColumns();
  }

  updateColumns(): void{
    this.impactsToShow = this.filterValues.impacts;
    this.displayedColumns = this.getDisplayedColumns();
  }

  getDisplayedColumns(): string[]{
    const defaultColumns: string[] = ['uniqueString', 'requirementDescription', 'variantsTitle', 'values'];
    return this.columnDefinitions
      .filter(cd => this.impactsToShow.length === 0 || defaultColumns.includes(cd.def) || this.impactsToShow.includes(cd.def))
      .map(cd => cd.def);
  }

  private initSorting(): void {
    this.tableDatasource.sort = this.sort;
  }

  fillValuesColumn(parameter: any): string {
    let retValue = '';
    const values: Value[] = parameter.values;
    if (values == null) {
      return retValue;
    }
    values.forEach(value1 => retValue = retValue.concat(value1.valueTitle, '\n'));
    return retValue;
  }

  isPositivOrNegativ(element: Requirements, impact: Impact, positiv: boolean): boolean {
    if (element.requirementImpactPoints == null || element.requirementImpactPoints.length === 0) {
      return false;
    }
    let retValue = false;
    element.requirementImpactPoints.forEach(value => {
      if (value.entityId === impact.id) {
        const points: number | null = value.points;
        if ((positiv && points && 0 < points) || (points && 0 > points)) {
          retValue = true;
        }
      }
    });
    return retValue;
  }

  setSliderVisible(element: Requirements, impact: Impact): void {
    const toRemove = this.showElementSlider.find(value => value.req === element.rootEntityId && value.imp === impact.id);
    if (toRemove != null) {
      const index = this.showElementSlider.indexOf(toRemove, 0);
      if (index > -1) {
        this.showElementSlider.splice(index, 1);
      }
    } else {
      this.showElementSlider.push({req: element.rootEntityId, imp: impact.id});
    }
  }

  valueChange(element: Requirements, impact: Impact, event: MatSliderChange): void {
    if (event.value !== null) {
      if (event.value === impact.value) {
        const toDelete: RequirementImpactPoints | undefined = element.requirementImpactPoints.find(value => value.entityId === impact.id);
        if (toDelete != null) {
          const index = element.requirementImpactPoints.indexOf(toDelete, 0);
          if (index > -1) {
            element.requirementImpactPoints.splice(index, 1);
          }
        }
      } else {
        let found = false;
        element.requirementImpactPoints.forEach(value => {
          if (value.entityId === impact.id) {
            value.points = event.value;
            found = true;
          }
        });
        if (!found) {
          const newPoint: RequirementImpactPoints = {
            points: event.value,
            entityId: impact.id,
            impactDescription: impact.description,
          };
          element.requirementImpactPoints.push(newPoint);
        }
      }
    }
    this.updateRequirement(element);
  }

  descriptionChange(requirements: Requirements): void {
    this.updateRequirement(requirements);
  }

  deleteRequirement(requirements: Requirements): void {
    this.requirementsDataService.deleteRequirement(requirements);
  }

  updateRequirement(requirements: Requirements): void {
    this.requirementsDataService.updateRequirements(requirements);
  }

  testKeyPress(event: any): void {
    if (event.ctrlKey && event.keyCode === 10) {
      this.requirementsDataService.copyRequirement(this.selectedRequirements);
    }
  }

  openVariantsDialog(): void {
    const dialogref = this.dialog.open(VariantDialogComponent, {data: {id: ''}});
    dialogref.afterClosed().subscribe(() => {
      this.variantsRestService.getVariants(this.analysisId).subscribe((result: any) => {
        this.variantsSoureces = [];
        result.forEach((variantsRest: Variants) => {
          const variants: Variants = {
            entityId: variantsRest.id,
            description: variantsRest.description,
            variantsTitle: variantsRest.title,
            archived: variantsRest.archived
          };
          this.variantsSoureces.push(variants);
        });
      });
    });
  }

  getSelectedRequirment(requirements: Requirements): void {
    this.selectedRequirements = requirements;
  }

  variantsChange(element: Requirements, $event: any): void {
    const variantId: string = $event.value;
    const variant: Variants = new Variants();
    variant.entityId = variantId;
    element.variantsTitle = [variant];
    this.updateRequirement(element);
  }

  checkAchrivedAndOpenDialog(variantsTitleElement: Variants[]): void {
    if (variantsTitleElement.length > 0 && variantsTitleElement[0].archived) {
      this.dialog.open(VariantDialogComponent, {data: {id: '' + variantsTitleElement[0].entityId}});
    }
  }

  valueForCell(element: Requirements, impact: Impact): number {
    let retValue = 0;
    const found = element.requirementImpactPoints.find(value => value.entityId === impact.id);
    if (!found) {
      retValue = impact.value;
    }else {
      retValue = (found.points as number);
    }
    return retValue;
  }

  show(element: Requirements, impact: Impact): boolean {
    return this.showElementSlider.some(se => se.req === element.rootEntityId && se.imp === impact.id);
  }

  reload(): void {
    // clear the Arrays from the old imp
    this.displayedColumns = this.displayedColumns.filter(value => !value.startsWith('IMP'));
    this.columnDefinitions = this.columnDefinitions.filter(value => !value.def.startsWith('IMP'));
    this.impactRestService.getImpacts(this.analysisId).subscribe((result: any) => {
      this.impactSoureces = [];
      result.forEach((impactRest: Impact) => {
        const impact: Impact = {
          id: impactRest.id,
          uniqueString: impactRest.uniqueString,
          description: impactRest.description,
          value: impactRest.value,
          valueSystem: impactRest.valueSystem
        };
        this.impactSoureces.push(impact);
      });
      let impactIdList: string[] = [];
      this.impactSoureces.forEach(value => {
        impactIdList = impactIdList.concat(value.uniqueString);
        this.columnDefinitions.push({def: value.uniqueString, hide: true});
      });
      this.displayedColumns = this.displayedColumns.concat(impactIdList);
    });
  }
}
