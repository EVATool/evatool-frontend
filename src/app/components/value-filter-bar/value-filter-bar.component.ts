import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {LogService} from '../../services/log.service';
import {ValueTableFilterEvent} from './ValueTableFilterEvent';
import {FilterCategoryComponent} from '../filter-category/filter-category.component';
import {ValueTypeDataService} from '../../services/data/value-type-data.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ValueType} from '../../model/ValueType';

@Component({
  selector: 'app-value-filter-bar',
  templateUrl: './value-filter-bar.component.html',
  styleUrls: ['./value-filter-bar.component.scss']
})
export class ValueFilterBarComponent implements OnInit {

  private ngUnsubscribe = new Subject();

  @ViewChild('valueTypeFilter') valueTypeFilter!: FilterCategoryComponent;
  @Output() filterChanged = new EventEmitter<ValueTableFilterEvent>();

  valueTypeNames!: string[];

  valueTableFilterEvent: ValueTableFilterEvent;
  suppressChildEvent = false;

  constructor(private logger: LogService,
              public valueTypeDataService: ValueTypeDataService) {
    this.valueTableFilterEvent = ValueTableFilterEvent.getDefault();
  }

  ngOnInit(): void {
    this.valueTypeDataService.loadedValueTypes
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((valueTypes: ValueType[]) => {
        this.updateValueTypes();
      });

    this.valueTypeDataService.createdValueType
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((valueType: ValueType) => {
        this.updateValueTypes();
      });

    this.valueTypeDataService.updatedValueType
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((valueType: ValueType) => {
        this.updateValueTypes();
      });

    this.valueTypeDataService.deletedValueType
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((valueType: ValueType) => {
        this.updateValueTypes();
      });

    this.updateValueTypes();
  }

  updateValueTypes(): void {
    this.valueTypeNames = this.valueTypeDataService.valueTypes.map(
      valueType => valueType.name);
  }

  valueTypeFilterChanged(valueType: any): void {
    this.valueTableFilterEvent.valueType = valueType;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.valueTableFilterEvent);
    }
  }

  clearFilter(): void {
    this.suppressChildEvent = true;

    this.valueTypeFilter.clearFilter();

    this.suppressChildEvent = false;
    this.filterChanged.emit(this.valueTableFilterEvent);
  }
}
