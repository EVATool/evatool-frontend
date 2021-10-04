import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {EntityTableComponent} from '../abstract/entity-table/entity-table.component';
import {MatTableDataSource} from '@angular/material/table';
import {AnalysisDataService} from '../../services/data/analysis-data.service';
import {ImpactDataService} from '../../services/data/impact-data.service';
import {CrossUiEventService} from '../../services/event/cross-ui-event.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LogService} from '../../services/log.service';
import {takeUntil} from 'rxjs/operators';
import {SliderFilterSettings} from '../impact-slider/SliderFilterSettings';
import {Value} from '../../model/Value';
import {ValueReferencedByImpactsEvent} from '../../services/event/events/http409/ValueReferencedByImpactsEvent';
import {ValueDataService} from '../../services/data/value-data.service';
import {ValueTableFilterEvent} from '../value-filter-bar/ValueTableFilterEvent';
import {ValueDeletionFailedEvent} from '../../services/event/events/DeletionFailedEvents';

@Component({
  selector: 'app-value-table',
  templateUrl: './value-table.component.html',
  styleUrls: ['./value-table.component.scss']
})
export class ValueTableComponent extends EntityTableComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['name', 'valueType', 'description'];
  tableDataSource = new MatTableDataSource<Value>();
  filterEvent!: ValueTableFilterEvent;

  constructor(public valueData: ValueDataService,
              private analysisData: AnalysisDataService,
              private impactData: ImpactDataService,
              private crossUI: CrossUiEventService,
              private snackBar: MatSnackBar,
              protected logger: LogService) {
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
      .subscribe((values: Value) => {
        this.updateTableDataSource();
        setTimeout(() => {
          const index = this.getRowIndex(values[-1]);
          this.scrollToIndex(index);
        }, 10);
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

      const levelFilter = searchTerms.level.length === 0 || searchTerms.level.indexOf(data.level) !== -1;

      const priorityFilter = searchTerms.priority.length === 0 || searchTerms.priority.indexOf(data.priority) !== -1;

      const impactedFilter = data.impacted === null || SliderFilterSettings.filter(searchTerms.impacted, data.impacted * -1);

      return levelFilter && priorityFilter && impactedFilter;
    };
  }

  createValue(): void {
    // Get valid default value.
    const value = this.valueData.createDefaultValue(this.analysisData.currentAnalysis);

    // Ensure visibility with current filter settings.
    if (this.filterEvent) {
      // if (this.filterEvent.level.length !== 0) {
      //   value.level = this.filterEvent.level[0];
      // }
      // if (this.filterEvent.priority.length !== 0) {
      //   value.priority = this.filterEvent.priority[0];
      // }
    }

    this.valueData.createValue(value);
  }

  updateValue(value: Value): void {
    this.valueData.updateValue(value);
  }

  deleteValue(value: Value): void {
    value.deletionFlagged = true;
    this.valueData.deleteValue(value);
  }
}
