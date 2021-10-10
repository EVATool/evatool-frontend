import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Requirement} from '../../model/Requirement';
import {Impact} from '../../model/Impact';
import {Value} from '../../model/Value';
import {RequirementDelta} from '../../model/RequirementDelta';
import {RequirementTableFilterEvent} from '../requirement-filter-bar/RequirementTableFilterEvent';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {RequirementDataService} from '../../services/data/requirement-data.service';
import {LogService} from '../../services/log.service';
import {ImpactDataService} from '../../services/data/impact-data.service';
import {ValueDataService} from '../../services/data/value-data.service';
import {AnalysisDataService} from '../../services/data/analysis-data.service';
import {RequirementDeltaDataService} from '../../services/data/requirement-delta-data.service';
import {VariantDataService} from '../../services/data/variant-data.service';
import {Variant} from '../../model/Variant';
import {SliderFilterSettings} from '../impact-slider/SliderFilterSettings';
import {CrossUiEventService} from '../../services/event/cross-ui-event.service';
import {takeUntil} from 'rxjs/operators';
import {RequirementsReferencingVariantEvent} from '../../services/event/events/http409/RequirementsReferencingVariantEvent';
import {RequirementDeltasReferencingImpactEvent} from '../../services/event/events/http409/RequirementDeltasReferencingImpactEvent';
import {RequirementDeletionFailedEvent, RequirementDeltaDeletionFailedEvent} from '../../services/event/events/DeletionFailedEvents';
import {mouseInOutAnimation} from '../../animations/MouseInOutAnimation';
import {EntityTableComponent} from '../abstract/entity-table/entity-table.component';
import {Stakeholder} from '../../model/Stakeholder';
import {ArchivedVariantReferencedByRequirement} from '../../services/event/events/local/ArchivedVariantReferencedByRequirement';

@Component({
  selector: 'app-requirement-table',
  templateUrl: './requirement-table.component.html',
  styleUrls: ['./requirement-table.component.scss'],
  animations: [mouseInOutAnimation]
})
export class RequirementTableComponent extends EntityTableComponent implements OnInit, AfterViewInit, OnDestroy {

  staticDisplayedColumns = ['prefixSequenceId', 'description', 'variants', 'values', 'delete-button'];
  displayedColumns: string[] = [];
  tableDataSource = new MatTableDataSource<Requirement>();
  filterEvent!: RequirementTableFilterEvent;

  deletionFlaggedVariant!: Variant;
  deletionFlaggedImpact!: Impact;

  constructor(
    protected logger: LogService,
    public requirementDataService: RequirementDataService,
    public requirementDeltaDataService: RequirementDeltaDataService,
    public impactDataService: ImpactDataService,
    public valueDataService: ValueDataService,
    public analysisDataService: AnalysisDataService,
    public variantDataService: VariantDataService,
    private crossUI: CrossUiEventService,
    private dialog: MatDialog) {
    super(logger);
  }

  ngOnInit(): void {
    super.onInit();

    this.crossUI.userWantsToSeeRequirementsReferencingVariant
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: RequirementsReferencingVariantEvent) => {
        this.deletionFlaggedVariant = event.variant;
        event.requirements.forEach(requirement => {
          requirement.highlighted = true;
        });
      });

    this.crossUI.userWantsToSeeRequirementsReferencingImpact
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: RequirementDeltasReferencingImpactEvent) => {
        this.deletionFlaggedImpact = event.impact;
        event.deltas.forEach((delta: RequirementDelta) => {
          delta.highlighted = true;
        });
      });

    this.crossUI.requirementDeletionFailed
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: RequirementDeletionFailedEvent) => {
        event.entity.deletionFlagged = false;
      });

    this.crossUI.requirementDeltaDeletionFailed
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: RequirementDeltaDeletionFailedEvent) => {
        event.entity.deletionFlagged = false;
      });

    this.impactDataService.loadedImpacts
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((impacts: Impact[]) => {
        this.updateImpactColumns();
      });
    this.impactDataService.createdImpact
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((impact: Impact) => {
        this.updateImpactColumns();
      });
    this.impactDataService.deletedImpact
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((impact: Impact) => {
        this.updateImpactColumns();
      });
    this.updateImpactColumns();

    this.requirementDataService.loadedRequirements
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((requirements: Requirement[]) => {
        this.updateTableDataSource();
      });
    this.requirementDataService.createdRequirement
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((requirement: Requirement) => {
        this.updateTableDataSource();
        // TODO scroll to newly created row.
      });
    this.requirementDataService.deletedRequirement
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((requirement: Requirement) => {
        this.updateTableDataSource();
      });
    this.updateTableDataSource();

    this.requirementDeltaDataService.createdRequirementDelta
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((delta: RequirementDelta) => {
        this.showDeltaSlider(delta);
      });

    this.crossUI.highlightTextChanged
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((highlightText: string) => {
        this.highlightFilter = highlightText;
      });

    this.updateTableDataSource();
  }

  ngAfterViewInit(): void {
    super.afterViewInit();
  }

  ngOnDestroy(): void {
    super.onDestroy();
  }

  updateTableDataSource(): void {
    this.tableDataSource.data = this.requirementDataService.requirements;
  }

  createDataAccessor(): (requirement: Requirement, property: string) => any {
    return (requirement, property) => {
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

  createFilterPredicate(): (data: any, filter: string) => boolean {
    return (data: Requirement, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      const variantNames = data.variants.map((v: Variant) => v.name);
      const variantFilter = searchTerms.variant.length === 0 || searchTerms.variant.every((s: string) => variantNames.includes(s));

      const valueNames = this.getAffectedValues(data);
      const valueFilter = searchTerms.value.length === 0 || searchTerms.value.every((s: string) => valueNames.includes(s));

      const stakeholderNames = this.getAffectedStakeholders(data);
      const stakeholderFilter = searchTerms.stakeholder.length === 0 || searchTerms.stakeholder.every((s: string) => stakeholderNames.includes(s));

      let meritFilter = true;
      const deltas = this.getRequirementDeltas(data);
      deltas.forEach((delta: RequirementDelta) => {
        if (!searchTerms.impact.includes(delta.impact.prefixSequenceId)
          && delta.overwriteMerit !== null
          && !SliderFilterSettings.filter(searchTerms.merit, delta.overwriteMerit)) {
          meritFilter = false;
        }
      });

      return variantFilter && valueFilter && stakeholderFilter && meritFilter;
    };
  }

  updateFilter(event: RequirementTableFilterEvent): void {
    this.logger.debug(this, 'Overwritten updateFilter');
    this.updateImpactColumns(event.impact);
    super.updateFilter(event);
  }

  createRequirement(): void {
    const requirement = this.requirementDataService.createDefaultRequirement(
      this.analysisDataService.currentAnalysis);

    // Ensure visibility with current filter settings.
    if (this.filterEvent) {
      if (this.filterEvent.variant.length !== 0) {
        requirement.variants = this.variantDataService.variants.filter(v => this.filterEvent.variant.includes(v.name));
      }
    }

    this.requirementDataService.createRequirement(requirement);
  }

  updateRequirement(requirement: Requirement): void {
    this.logger.trace(this, 'Update Requirement');
    if (requirement.highlighted) {
      requirement.highlighted = requirement.variants.includes(this.deletionFlaggedVariant);
    }

    this.requirementDataService.updateRequirement(requirement);
  }

  deleteRequirement(requirement: Requirement): void {
    requirement.deletionFlagged = true;
    this.requirementDataService.deleteRequirement(requirement);
  }

  getVariantNamesOfRequirement(requirement: Requirement): string {
    if (requirement.variants.length === 0) {
      return 'Applies to all variants';
    }

    // TODO this shows a requirement to have twice the actual variants.
    const uniqueVariants: Variant[] = [];
    for (const variant of requirement.variants) {
      if (!uniqueVariants.includes(variant)) {
        uniqueVariants.push(variant);
      }
    }
    return uniqueVariants.map(v => v.name).join(', ');
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
    delta.deletionFlagged = true;
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

  // TODO Delete
  openVariantsDialog(ids?: string[]): void {
    this.logger.trace(this, 'Opening Variants Dialog');

    // this.dialog.open(VariantDialogComponent, {
    //   height: '60%',
    //   width: '50%',
    //   data: {ids}
    // });
  }

  updateImpactColumns(includeOnlyTheseImpacts?: string[]): void {
    const displayedColumns: string[] = [];
    this.staticDisplayedColumns.forEach((col: string) => displayedColumns.push(col));

    this.impactDataService.impacts.forEach((impact: Impact) => {
      if (!includeOnlyTheseImpacts || includeOnlyTheseImpacts.length === 0 || includeOnlyTheseImpacts.includes(impact.prefixSequenceId)) {
        const index = displayedColumns.length - 1;
        displayedColumns.splice(index, 0, impact.prefixSequenceId);
      }
    });

    this.displayedColumns = displayedColumns;
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

  getAffectedStakeholders(requirement: Requirement): string[] {
    const stakeholders: Stakeholder[] = [];

    this.requirementDeltaDataService.requirementDeltas.forEach((delta: RequirementDelta) => {
      if (delta.requirement === requirement) {
        if (!stakeholders.includes(delta.impact.stakeholder)) {
          stakeholders.push(delta.impact.stakeholder);
        }
      }
    });

    return stakeholders.map(value => value.name);
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

  emitArchivedReferenced(variants: Variant[], requirement: Requirement): void {
    const event = new ArchivedVariantReferencedByRequirement(variants, requirement);
    this.crossUI.userWantsToSeeArchivedVariantReferencedByRequirement.emit(event);
  }
}
