import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Requirement} from '../../../../model/Requirement';
import {Impact} from '../../../../model/Impact';
import {VariantsDialogComponent} from '../variants-dialog/variants-dialog.component';
import {Value} from '../../../../model/Value';
import {RequirementDelta} from '../../../../model/RequirementDelta';
import {RequirementTableFilterEvent} from '../requirements-filter-bar/RequirementTableFilterEvent';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {RequirementDataService} from '../../../../services/data/requirement-data.service';
import {MatSort} from '@angular/material/sort';
import {NgScrollbar} from 'ngx-scrollbar';
import {LogService} from '../../../../services/log.service';
import {ImpactDataService} from '../../../../services/data/impact-data.service';
import {ValueDataService} from '../../../../services/data/value-data.service';
import {AnalysisDataService} from '../../../../services/data/analysis-data.service';
import {RequirementDeltaDataService} from '../../../../services/data/requirement-delta-data.service';
import {VariantDataService} from '../../../../services/data/variant-data.service';
import {Variant} from '../../../../model/Variant';
import {animate, style, transition, trigger} from '@angular/animations';
import {SliderFilterSettings} from '../../../impact-slider/SliderFilterSettings';
import {CrossUiEventService, ImpactReferencedByRequirementEvent} from '../../../../services/cross-ui-event.service';

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
export class RequirementsTableComponent implements OnInit, AfterViewInit {
  @ViewChild(NgScrollbar) scrollbarRef!: NgScrollbar;
  @ViewChild(MatTable) table!: MatTable<Impact>;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  staticDisplayedColumns = ['prefixSequenceId', 'description', 'variants', 'values', 'delete-button'];
  displayedColumns: string[] = [];
  tableDataSource = new MatTableDataSource<Requirement>();
  windowScrolled = false;
  highlightFilter = '';
  deletionFlaggedVariant!: Variant;
  deletionFlaggedImpact!: Impact;

  constructor(
    private logger: LogService,
    public requirementDataService: RequirementDataService,
    public requirementDeltaDataService: RequirementDeltaDataService,
    public impactDataService: ImpactDataService,
    public valueDataService: ValueDataService,
    public analysisDataService: AnalysisDataService,
    public variantDataService: VariantDataService,
    private crossUI: CrossUiEventService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.crossUI.userWantsToSeeImpactReferencedByRequirement.subscribe((event: ImpactReferencedByRequirementEvent) => {
      this.deletionFlaggedImpact = event.impact;
      this.requirementDeltaDataService.requirementDeltas.forEach((delta: RequirementDelta) => {
        delta.highlighted = event.deltas.includes(delta);
      });
    });

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
    this.scrollbarRef?.scrolled.subscribe(e => {
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
          return requirement.variants.map(variant => variant.name).join(',');
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
        if (!searchTerms.impact.includes(delta.impact.prefixSequenceId)
          && delta.overwriteMerit !== null
          && !SliderFilterSettings.filter(searchTerms.merit, delta.overwriteMerit)) {
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
    this.logger.info(this, 'Update Requirement');
    if (requirement.highlighted) {
      requirement.highlighted = requirement.variants.includes(this.deletionFlaggedVariant);
    }
    this.requirementDataService.updateRequirement(requirement);
  }

  deleteRequirement(requirement: Requirement): void {
    this.requirementDataService.deleteRequirement(requirement);
  }

  createRequirementDelta(delta: RequirementDelta): void {
    this.requirementDeltaDataService.createRequirementDelta(delta);
  }

  updateRequirementDelta(delta: RequirementDelta): void {
    if (delta.highlighted) {
      delta.highlighted = delta.impact === this.deletionFlaggedImpact;
    }

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
    for (const delta of deltas) {
      delta.visible = false;
    }
  }

  openVariantsDialog(ids?: string[]): void {
    this.logger.info(this, 'Opening Variants Dialog');

    const dialogRef = this.dialog.open(VariantsDialogComponent, {
      height: '60%',
      width: '50%',
      data: {ids: ids}
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.logger.info(this, 'Closing Variants Dialog');

      if (data?.showReferencedRequirements) {
        this.deletionFlaggedVariant = data.variant;
        this.requirementDataService.requirements.forEach(requirement => {
          requirement.highlighted = requirement.variants.includes(data.variant);
        });
      }
    });
  }

  referencesArchivedVariant(requirement: Requirement): boolean {
    return this.getReferencedArchivedVariants(requirement).length > 0;
  }

  getReferencedArchivedVariants(requirement: Requirement): Variant[] {
    return requirement.variants.filter(v => v.archived);
  }

  getReferencedArchivedVariantIds(requirement: Requirement): string[] {
    return this.getReferencedArchivedVariants(requirement).map(v => v.id);
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

  getRequirementDeltas(requirement: Requirement): RequirementDelta[] {
    return this.requirementDeltaDataService.requirementDeltas.filter(
      delta => delta.requirement === requirement
    );
  }
}
