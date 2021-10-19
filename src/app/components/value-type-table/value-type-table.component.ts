import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ValueType} from '../../model/ValueType';
import {LogService} from '../../services/log.service';
import {ValueTypeDataService} from '../../services/data/value-type-data.service';
import {AnalysisDataService} from '../../services/data/analysis-data.service';
import {CrossUiEventService} from '../../services/event/cross-ui-event.service';
import {ValuesReferencingValueType} from '../../services/event/events/http409/ValuesReferencingValueType';
import {ValueTypeDeletionFailedEvent} from '../../services/event/events/DeletionFailedEvents';
import {TranslateService} from '@ngx-translate/core';
import {stringFormat} from '../../extensions/string.extensions';


@Component({
  selector: 'app-value-type-table',
  templateUrl: './value-type-table.component.html',
  styleUrls: ['./value-type-table.component.scss']
})
export class ValueTypeTableComponent implements OnInit, AfterViewInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  displayedColumns = ['name', 'description'];
  tableDataSource: MatTableDataSource<ValueType> = new MatTableDataSource<ValueType>();

  constructor(
    private logger: LogService,
    private valueTypeDataService: ValueTypeDataService,
    private analysisDataService: AnalysisDataService,
    private crossUI: CrossUiEventService,
    private snackBar: MatSnackBar,
    private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.crossUI.valueTypeReferencedByValues
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: ValuesReferencingValueType) => {
        this.translate.get('VALUE_TYPE_TABLE.STILL_REFERENCED_BY_VALUES', {value: 'world'}).subscribe((res: string) => {
          this.snackBar.open(res, '', {duration: 5000});
          const action = 'show';
          const snackBarRef = this.snackBar.open(stringFormat(res, String(event.values.length)), action, {duration: 5000});
          snackBarRef.onAction()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
              this.logger.info(this, 'User wants to see the impacts referencing the value');
              this.crossUI.userWantsToSeeValuesReferencingValueType.next(event);
            });
        });
      });

    this.crossUI.valueTypeDeletionFailed
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: ValueTypeDeletionFailedEvent) => {
        event.entity.deletionFlagged = false;
      });

    this.valueTypeDataService.loadedValueTypes
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((valueTypes: ValueType[]) => {
        this.updateTableDataSource();
      });

    this.valueTypeDataService.createdValueType
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((valueType: ValueType) => {
        this.updateTableDataSource();
      });

    this.valueTypeDataService.deletedValueType
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((valueType: ValueType) => {
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
    this.tableDataSource.data = this.valueTypeDataService.valueTypes;
  }

  initSorting(): void {
    this.tableDataSource.sort = this.sort;
  }

  createValueType(): void {
    const valueType = this.valueTypeDataService.createDefaultValueType(
      this.analysisDataService.currentAnalysis);
    this.valueTypeDataService.createValueType(valueType);
  }

  updateValueType(valueType: ValueType): void {
    this.logger.trace(this, 'Update Value Type');
    this.valueTypeDataService.updateValueType(valueType);
  }

  deleteValueType(valueType: ValueType): void {
    valueType.deletionFlagged = true;
    this.valueTypeDataService.deleteValueType(valueType);
  }
}
