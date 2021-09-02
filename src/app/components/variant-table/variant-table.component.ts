import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Variant} from '../../model/Variant';
import {VariantDataService} from '../../services/data/variant-data.service';
import {LogService} from '../../services/log.service';
import {MatSort} from '@angular/material/sort';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AnalysisDataService} from '../../services/data/analysis-data.service';
import {RequirementDataService} from '../../services/data/requirement-data.service';
import {HttpMarshallService} from '../../services/http/http-marshall.service';
import {CrossUiEventService} from '../../services/event/cross-ui-event.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {VariantReferencedByRequirementsEvent} from '../../services/event/events/http409/VariantReferencedByRequirementsEvent';
import {VariantDeletionFailedEvent} from '../../services/event/events/DeletionFailedEvents';

@Component({
  selector: 'app-variant-table',
  templateUrl: './variant-table.component.html',
  styleUrls: ['./variant-table.component.scss']
})
export class VariantTableComponent implements OnInit, AfterViewInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @Input() archived!: boolean;
  @Input() ids: string[] = [];
  @Output() userWantsToSeeReferencedRequirements: EventEmitter<Variant> = new EventEmitter();

  displayedColumns = ['name', 'description'];
  tableDataSource: MatTableDataSource<Variant> = new MatTableDataSource<Variant>();

  constructor(private logger: LogService,
              private requirementDataService: RequirementDataService,
              public variantDataService: VariantDataService,
              private analysisDataService: AnalysisDataService,
              private crossUI: CrossUiEventService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.crossUI.variantReferencedByRequirements
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: VariantReferencedByRequirementsEvent) => {
        const message = 'This variant cannot be deleted. It is still being used by '
          + event.requirements.length + ' requirement' + (event.requirements.length === 1 ? '' : 's') + '.';
        const action = 'show';
        const snackBarRef = this.snackBar.open(message, action, {duration: 5000});
        snackBarRef.onAction()
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(() => {
            this.logger.info(this, 'User wants to see the requirements referencing the variant');
            this.crossUI.userWantsToSeeVariantReferencedByRequirements.emit(event);
          });
      });

    this.crossUI.variantDeletionFailed
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: VariantDeletionFailedEvent) => {
        event.entity.deletionFlagged = false;
      });

    this.variantDataService.loadedVariants
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((variants: Variant[]) => {
        this.updateTableDataSource();
      });

    this.variantDataService.createdVariant
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((variant: Variant) => {
        this.updateTableDataSource();
      });

    this.variantDataService.updatedVariant
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((variant: Variant) => {
        this.updateTableDataSource();
      });

    this.variantDataService.deletedVariant
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((variant: Variant) => {
        this.updateTableDataSource();
      });

    this.updateTableDataSource();
  }

  ngAfterViewInit(): void {
    this.initSorting();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  updateTableDataSource(): void {
    this.tableDataSource.data = this.variantDataService.variants.filter(
      variant => variant.archived === this.archived);
  }

  initSorting(): void {
    this.tableDataSource.sort = this.sort;
  }

  createVariant(): void {
    const variant = this.variantDataService.createDefaultVariant(
      this.analysisDataService.currentAnalysis);
    this.variantDataService.createVariant(variant);
  }

  updateVariant(variant: Variant): void {
    this.variantDataService.updateVariant(variant);
  }

  deleteVariant(variant: Variant): void {
    variant.deletionFlagged = true;
    this.variantDataService.deleteVariant(variant);
  }

  archivedVariantReferenced(variant: Variant): boolean {
    return this.ids?.includes(variant.id);
  }
}
