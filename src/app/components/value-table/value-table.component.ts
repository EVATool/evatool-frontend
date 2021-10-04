import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {EntityTableComponent} from '../abstract/entity-table/entity-table.component';
import {MatTableDataSource} from '@angular/material/table';
import {AnalysisDataService} from '../../services/data/analysis-data.service';
import {ImpactDataService} from '../../services/data/impact-data.service';
import {CrossUiEventService} from '../../services/event/cross-ui-event.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LogService} from '../../services/log.service';
import {takeUntil} from 'rxjs/operators';
import {Value} from '../../model/Value';
import {ValueReferencedByImpactsEvent} from '../../services/event/events/http409/ValueReferencedByImpactsEvent';
import {ValueDataService} from '../../services/data/value-data.service';
import {ValueTableFilterEvent} from '../value-filter-bar/ValueTableFilterEvent';
import {ValueDeletionFailedEvent} from '../../services/event/events/DeletionFailedEvents';
import {ValueTypeDataService} from '../../services/data/value-type-data.service';
import {newRowAnimation} from '../../animations/NewRowAnimation';
import {ArchivedValueReferencedByImpact} from '../../services/event/events/local/ArchivedValueReferencedByImpact';
import {ValueTypeDialogComponent} from '../value-type-dialog/value-type-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-value-table',
  templateUrl: './value-table.component.html',
  styleUrls: ['./value-table.component.scss'],
  animations: [newRowAnimation]
})
export class ValueTableComponent extends EntityTableComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['archived', 'name', 'valueType', 'description'];
  tableDataSource = new MatTableDataSource<Value>();
  filterEvent!: ValueTableFilterEvent;

  archivedFlaggedValue!: Value;

  constructor(public valueTypeData: ValueTypeDataService,
              public valueData: ValueDataService,
              private analysisData: AnalysisDataService,
              private impactData: ImpactDataService,
              private crossUI: CrossUiEventService,
              private snackBar: MatSnackBar,
              protected logger: LogService,
              private dialog: MatDialog) {
    super(logger);
  }

  ngOnInit(): void {
    super.onInit();

    this.crossUI.valueReferencedByImpacts
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: ValueReferencedByImpactsEvent) => {
        this.logger.warn(this, 'This value is still being used by ' + event.impacts.length + ' impacts');
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

    this.crossUI.userWantsToSeeArchivedValueReferencedByImpact
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: ArchivedValueReferencedByImpact) => {
        this.archivedFlaggedValue = event.value;
        this.archivedFlaggedValue.highlighted = true;
      });

    this.crossUI.valueDeletionFailed
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: ValueDeletionFailedEvent) => {
        event.entity.deletionFlagged = false;
      });

    this.valueData.loadedValues
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((values: Value[]) => {
        this.updateTableDataSource();
      });

    this.valueData.createdValue
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value: Value) => {
        this.updateTableDataSource();
        // TODO scroll to newly created row.
      });

    this.valueData.deletedValue
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((values: Value) => {
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
    this.tableDataSource.data = this.valueData.values;
  }

  createDataAccessor(): (value: Value, property: string) => any {
    return (value, property) => {
      switch (property) {
        case 'valueType':
          return value.valueType.name;
        default:
          return value[property];
      }
    };
  }

  createFilterPredicate(): (data: any, filter: string) => boolean {
    return (data: Value, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      const valueTypeFilter = searchTerms.valueType.length === 0 || searchTerms.valueType.indexOf(data.valueType.name) !== -1;

      return valueTypeFilter;
    };
  }

  createValue(): void {
    // Get valid default value.
    const value = this.valueData.createDefaultValue(this.analysisData.currentAnalysis);

    // Ensure visibility with current filter settings.
    if (this.filterEvent) {
      if (this.filterEvent.valueType.length !== 0) {
        const valueType = this.valueTypeData.valueTypes.find(s => s.name === this.filterEvent.valueType[0]);
        if (valueType) {
          value.valueType = valueType;
        }
      }
    }

    this.valueData.createValue(value);
  }

  updateValue(value: Value): void {
    this.logger.trace(this, 'Update Value');

    if (value.highlighted && !value.archived) {
      value.highlighted = false;
    }

    this.valueData.updateValue(value);
  }

  deleteValue(value: Value): void {
    value.deletionFlagged = true;
    this.valueData.deleteValue(value);
  }

  openValueTypesDialog(): void {
    this.logger.trace(this, 'Opening Value Types Dialog');

    this.dialog.open(ValueTypeDialogComponent, {
      height: '80%',
      width: '50%'
    });
  }
}
