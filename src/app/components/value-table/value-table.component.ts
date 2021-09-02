import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Value} from '../../model/Value';
import {LogService} from '../../services/log.service';
import {ValueDataService} from '../../services/data/value-data.service';
import {ImpactDataService} from '../../services/data/impact-data.service';
import {AnalysisDataService} from '../../services/data/analysis-data.service';
import {CrossUiEventService} from '../../services/event/cross-ui-event.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ValueReferencedByImpactsEvent} from '../../services/event/events/http409/ValueReferencedByImpactsEvent';
import {ValueDeletionFailedEvent} from '../../services/event/events/DeletionFailedEvents';

@Component({
  selector: 'app-value-table',
  templateUrl: './value-table.component.html',
  styleUrls: ['./value-table.component.scss']
})
export class ValueTableComponent implements OnInit, AfterViewInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @Input() valueType!: string;
  @Input() id = '';
  @Output() userWantsToSeeReferencedImpacts: EventEmitter<Value> = new EventEmitter();

  displayedColumns = ['archived', 'name', 'description'];
  tableDataSource: MatTableDataSource<Value> = new MatTableDataSource<Value>();

  constructor(
    private logger: LogService,
    private valueDataService: ValueDataService,
    private impactDataService: ImpactDataService,
    private analysisDataService: AnalysisDataService,
    private crossUI: CrossUiEventService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.crossUI.valueReferencedByImpacts
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: ValueReferencedByImpactsEvent) => {
        const message = 'This value cannot be deleted. It is still being used by '
          + event.impacts.length + ' impact' + (event.impacts.length === 1 ? '' : 's') + '.';
        const action = 'show';
        const snackBarRef = this.snackBar.open(message, action, {duration: 5000});
        snackBarRef.onAction()
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(() => {
            this.logger.info(this, 'User wants to see the impacts referencing the value');
            this.crossUI.userWantsToSeeValueReferencedByImpacts.emit(event);
          });
      });

    this.crossUI.valueDeletionFailed
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: ValueDeletionFailedEvent) => {
        event.entity.deletionFlagged = false;
      });

    this.valueDataService.loadedValues
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((values: Value[]) => {
        this.updateTableDataSource();
      });

    this.valueDataService.createdValue
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value: Value) => {
        this.updateTableDataSource();
      });

    this.valueDataService.deletedValue
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value: Value) => {
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
    this.tableDataSource.data = this.valueDataService.values.filter(val => val.type === this.valueType);
  }

  initSorting(): void {
    this.tableDataSource.sort = this.sort;
  }

  createValue(): void {
    const value = this.valueDataService.createDefaultValue(
      this.analysisDataService.currentAnalysis);
    value.type = this.valueType;
    this.valueDataService.createValue(value);
  }

  updateValue(value: Value): void {
    this.logger.trace(this, 'Update Value');
    this.valueDataService.updateValue(value);
  }

  deleteValue(value: Value): void {
    value.deletionFlagged = true;
    this.valueDataService.deleteValue(value);
  }

  toggleValueArchived(event: Event, value: Value): void {
    value.archived = !value.archived;
    this.updateValue(value);
  }
}
