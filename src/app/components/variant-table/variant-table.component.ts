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
import {VariantTypeDialogComponent} from '../variant-type-dialog/variant-type-dialog.component';
import {TranslateService} from '@ngx-translate/core';
import {stringFormat} from '../../extensions/string.extensions';

@Component({
  selector: 'app-variant-table',
  templateUrl: './variant-table.component.html',
  styleUrls: ['./variant-table.component.scss']
})
export class VariantTableComponent extends EntityTableComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['archived', 'name', 'variantType', 'description'];
  tableDataSource = new MatTableDataSource<Variant>();
  filterEvent!: VariantTableFilterEvent;

  archivedFlaggedVariants!: Variant[];

  constructor(public variantTypeData: VariantTypeDataService,
              public variantData: VariantDataService,
              private analysisData: AnalysisDataService,
              private requirementData: RequirementDataService,
              private crossUI: CrossUiEventService,
              private snackBar: MatSnackBar,
              protected logger: LogService,
              private dialog: MatDialog,
              private translate: TranslateService) {
    super(logger);
  }

  ngOnInit(): void {
    super.onInit();

    this.crossUI.variantReferencedByRequirements
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: RequirementsReferencingVariantEvent) => {
        this.translate.get('VARIANT_TYPE_TABLE.STILL_REFERENCED_BY_REQUIREMENTS', {value: 'world'}).subscribe((res: string) => {
          const snackBarRef = this.snackBar.open(stringFormat(res, String(event.requirements.length)), 'show', {duration: 5000});
          snackBarRef.onAction()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
              this.logger.info(this, 'User wants to see the requirements referencing the variant');
              this.crossUI.userWantsToSeeRequirementsReferencingVariant.next(event);
            });
        });
      });

    this.crossUI.userWantsToSeeArchivedVariantReferencedByRequirement
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: ArchivedVariantReferencedByRequirement) => {
        this.archivedFlaggedVariants = event.variants;
        for (const variant of this.archivedFlaggedVariants) {
          variant.highlighted = true;
        }
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
    if (this.variantTypeData.variantTypes.length === 0) {
      this.translate.get('VARIANT_TABLE.VARIANT_TYPE_REQUIRED', {value: 'world'}).subscribe((message: string) => {
        this.translate.get('COMMON.CREATE', {value: 'world'}).subscribe((action: string) => {
          this.snackBar.open(message, action, {duration: 5000}).onAction()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
              this.openVariantTypesDialog();
            });
        });
      });
    } else {
      // Get valid default variant.
      const variant = this.variantData.createDefaultVariant(this.analysisData.currentAnalysis, this.variantTypeData.variantTypes[0]);

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
