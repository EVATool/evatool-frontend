import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {VariantType} from '../../model/VariantType';
import {LogService} from '../../services/log.service';
import {VariantTypeDataService} from '../../services/data/variant-type-data.service';
import {AnalysisDataService} from '../../services/data/analysis-data.service';
import {CrossUiEventService} from '../../services/event/cross-ui-event.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {takeUntil} from 'rxjs/operators';
import {VariantsReferencingVariantType} from '../../services/event/events/http409/VariantsReferencingVariantType';
import {VariantTypeDeletionFailedEvent} from '../../services/event/events/DeletionFailedEvents';
import {TranslateService} from '@ngx-translate/core';
import {stringFormat} from '../../extensions/string.extensions';

@Component({
  selector: 'app-variant-type-table',
  templateUrl: './variant-type-table.component.html',
  styleUrls: ['./variant-type-table.component.scss']
})
export class VariantTypeTableComponent implements OnInit, AfterViewInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  displayedColumns = ['name', 'description'];
  tableDataSource: MatTableDataSource<VariantType> = new MatTableDataSource<VariantType>();

  constructor(
    private logger: LogService,
    private variantTypeDataService: VariantTypeDataService,
    private analysisDataService: AnalysisDataService,
    private crossUI: CrossUiEventService,
    private snackBar: MatSnackBar,
    private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.crossUI.variantTypeReferencedByVariants
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: VariantsReferencingVariantType) => {
        this.translate.get('VARIANT_TYPE_TABLE.STILL_REFERENCED_BY_VARIANT', {value: 'world'}).subscribe((res: string) => {
          const snackBarRef = this.snackBar.open(stringFormat(res, String(event.variants.length)), 'show', {duration: 5000});
          snackBarRef.onAction()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
              this.logger.info(this, 'User wants to see the impacts referencing the variant');
              this.crossUI.userWantsToSeeVariantsReferencingVariantType.emit(event);
            });
        });
      });

    this.crossUI.variantTypeDeletionFailed
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: VariantTypeDeletionFailedEvent) => {
        event.entity.deletionFlagged = false;
      });

    this.variantTypeDataService.loadedVariantTypes
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((variantTypes: VariantType[]) => {
        this.updateTableDataSource();
      });

    this.variantTypeDataService.createdVariantType
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((variantType: VariantType) => {
        this.updateTableDataSource();
      });

    this.variantTypeDataService.deletedVariantType
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((variantType: VariantType) => {
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
    this.tableDataSource.data = this.variantTypeDataService.variantTypes;
  }

  initSorting(): void {
    this.tableDataSource.sort = this.sort;
  }

  createVariantType(): void {
    const variantType = this.variantTypeDataService.createDefaultVariantType(
      this.analysisDataService.currentAnalysis);
    this.variantTypeDataService.createVariantType(variantType);
  }

  updateVariantType(variantType: VariantType): void {
    this.logger.trace(this, 'Update Variant Type');
    this.variantTypeDataService.updateVariantType(variantType);
  }

  deleteVariantType(variantType: VariantType): void {
    variantType.deletionFlagged = true;
    this.variantTypeDataService.deleteVariantType(variantType);
  }
}
