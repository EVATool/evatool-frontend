import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Variant} from '../../model/Variant';
import {VariantDataService} from '../../services/data/variant-data.service';
import {LogService} from '../../services/log.service';
import {MatSort} from '@angular/material/sort';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AnalysisDataService} from '../../services/data/analysis-data.service';
import {RequirementDataService} from '../../services/data/requirement-data.service';
import {HttpLoaderService} from '../../services/http-loader.service';
import {CrossUiEventService, VariantDeletionFailedEvent, VariantReferencedByRequirementsEvent} from '../../services/cross-ui-event.service';

@Component({
  selector: 'app-variant-table',
  templateUrl: './variant-table.component.html',
  styleUrls: ['./variant-table.component.scss']
})
export class VariantTableComponent implements OnInit, AfterViewInit {
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
              private httpLoader: HttpLoaderService,
              private crossUI: CrossUiEventService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.crossUI.variantReferencedByRequirements.subscribe((event: VariantReferencedByRequirementsEvent) => {
      const message = 'This variant cannot be deleted. It is still being used by '
        + event.requirements.length + ' requirement' + (event.requirements.length === 1 ? '' : 's') + '.';
      const action = 'show';
      const snackBarRef = this.snackBar.open(message, action, {duration: 5000});
      snackBarRef.onAction().subscribe(() => {
        this.crossUI.userWantsToSeeVariantReferencedByRequirements.emit(event);
      });
    });

    this.crossUI.variantDeletionFailed.subscribe((event: VariantDeletionFailedEvent) => {
      event.entity.deletionFlagged = false;
    });

    this.variantDataService.loadedVariants.subscribe((variants: Variant[]) => {
      this.updateTableDataSource();
    });

    this.variantDataService.createdVariant.subscribe((variant: Variant) => {
      this.updateTableDataSource();
    });

    this.variantDataService.updatedVariant.subscribe((variant: Variant) => {
      this.updateTableDataSource();
    });

    this.variantDataService.deletedVariant.subscribe((variant: Variant) => {
      this.updateTableDataSource();
    });

    this.updateTableDataSource();
  }

  ngAfterViewInit(): void {
    this.initSorting();
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
