import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {VariantTableFilterEvent} from '../variant-filter-bar/VariantTableFilterEvent';
import {Variant} from '../../model/Variant';
import {VariantTypeDataService} from '../../services/data/variant-type-data.service';
import {VariantDataService} from '../../services/data/variant-data.service';
import {AnalysisDataService} from '../../services/data/analysis-data.service';
import {RequirementDataService} from '../../services/data/requirement-data.service';
import {CrossUiEventService} from '../../services/event/cross-ui-event.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LogService} from '../../services/log.service';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {EntityTableComponent} from '../abstract/entity-table/entity-table.component';
import {takeUntil} from 'rxjs/operators';
import {RequirementsReferencingVariantEvent} from '../../services/event/events/http409/RequirementsReferencingVariantEvent';
import {ArchivedVariantReferencedByRequirement} from '../../services/event/events/local/ArchivedVariantReferencedByRequirement';
import {VariantDeletionFailedEvent} from '../../services/event/events/DeletionFailedEvents';

@Component({
  selector: 'app-variant-table',
  templateUrl: './variant-table.component.html',
  styleUrls: ['./variant-table.component.scss']
})
export class VariantTableComponent extends EntityTableComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['archived', 'name', 'variantType', 'description'];
  tableDataSource = new MatTableDataSource<Variant>();
  filterEvent!: VariantTableFilterEvent;

  archivedFlaggedVariant!: Variant;

  constructor(public variantTypeData: VariantTypeDataService,
              public variantData: VariantDataService,
              private analysisData: AnalysisDataService,
              private requirementData: RequirementDataService,
              private crossUI: CrossUiEventService,
              private snackBar: MatSnackBar,
              protected logger: LogService,
              private dialog: MatDialog) {
    super(logger);
  }

  ngOnInit(): void {
    super.onInit();

    this.crossUI.variantReferencedByRequirements
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: RequirementsReferencingVariantEvent) => {
        this.logger.warn(this, 'This variant is still being used by ' + event.requirements.length + ' requirements');
        const message = 'This variant cannot be deleted. It is still being used by '
          + event.requirements.length + ' requirement' + (event.requirements.length === 1 ? '' : 's') + '.';
        const action = 'show';
        const snackBarRef = this.snackBar.open(message, action, {duration: 5000});
        snackBarRef.onAction()
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(() => {
            this.logger.info(this, 'User wants to see the requirements referencing the variant');
            this.crossUI.userWantsToSeeRequirementsReferencingVariant.emit(event);
          });
      });

    this.crossUI.userWantsToSeeArchivedVariantReferencedByRequirement
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: ArchivedVariantReferencedByRequirement) => {
        this.archivedFlaggedVariant = event.variant;
        this.archivedFlaggedVariant.highlighted = true;
      });

    this.crossUI.variantDeletionFailed
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: VariantDeletionFailedEvent) => {
        event.entity.deletionFlagged = false;
      });

    this.variantData.loadedVariants
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((variants: Variant[]) => {
        this.updateTableDataSource();
      });

    this.variantData.createdVariant
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((variant: Variant) => {
        this.updateTableDataSource();
        // TODO scroll to newly created row.
      });

    this.variantData.deletedVariant
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((variants: Variant) => {
        this.updateTableDataSource();
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
    this.tableDataSource.data = this.variantData.variants;
  }

  createDataAccessor(): (variant: Variant, property: string) => any {
    return (variant, property) => {
      switch (property) {
        case 'variantType':
          return variant.variantType.name;
        default:
          return variant[property];
      }
    };
  }

  createFilterPredicate(): (data: any, filter: string) => boolean {
    return (data: Variant, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      const variantTypeFilter = searchTerms.variantType.length === 0 || searchTerms.variantType.indexOf(data.variantType.name) !== -1;

      return variantTypeFilter;
    };
  }

  createVariant(): void {
    // Get valid default variant.
    const variant = this.variantData.createDefaultVariant(this.analysisData.currentAnalysis);

    // Ensure visibility with current filter settings.
    if (this.filterEvent) {
      if (this.filterEvent.variantType.length !== 0) {
        const variantType = this.variantTypeData.variantTypes.find(s => s.name === this.filterEvent.variantType[0]);
        if (variantType) {
          variant.variantType = variantType;
        }
      }
    }

    this.variantData.createVariant(variant);
  }

  updateVariant(variant: Variant): void {
    this.logger.trace(this, 'Update Variant');

    if (variant.highlighted && !variant.archived) {
      variant.highlighted = false;
    }

    this.variantData.updateVariant(variant);
  }

  deleteVariant(variant: Variant): void {
    variant.deletionFlagged = true;
    this.variantData.deleteVariant(variant);
  }

  openVariantTypesDialog(): void {
    this.logger.trace(this, 'Opening Variant Types Dialog');

    this.dialog.open(VariantTypeDialogComponent, {
      height: '80%',
      width: '50%'
    });
  }
}
