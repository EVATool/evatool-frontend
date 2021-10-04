import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {FilterCategoryComponent} from '../filter-category/filter-category.component';
import {LogService} from '../../services/log.service';
import {takeUntil} from 'rxjs/operators';
import {VariantTableFilterEvent} from './VariantTableFilterEvent';
import {VariantTypeDataService} from '../../services/data/variant-type-data.service';
import {VariantType} from '../../model/VariantType';

@Component({
  selector: 'app-variant-filter-bar',
  templateUrl: './variant-filter-bar.component.html',
  styleUrls: ['./variant-filter-bar.component.scss']
})
export class VariantFilterBarComponent implements OnInit {

  private ngUnsubscribe = new Subject();

  @ViewChild('variantTypeFilter') variantTypeFilter!: FilterCategoryComponent;
  @Output() filterChanged = new EventEmitter<VariantTableFilterEvent>();

  variantTypeNames!: string[];

  variantTableFilterEvent: VariantTableFilterEvent;
  suppressChildEvent = false;

  constructor(private logger: LogService,
              public variantTypeDataService: VariantTypeDataService) {
    this.variantTableFilterEvent = VariantTableFilterEvent.getDefault();
  }

  ngOnInit(): void {
    this.variantTypeDataService.loadedVariantTypes
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((variantTypes: VariantType[]) => {
        this.updateVariantTypes();
      });

    this.variantTypeDataService.createdVariantType
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((variantType: VariantType) => {
        this.updateVariantTypes();
      });

    this.variantTypeDataService.updatedVariantType
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((variantType: VariantType) => {
        this.updateVariantTypes();
      });

    this.variantTypeDataService.deletedVariantType
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((variantType: VariantType) => {
        this.updateVariantTypes();
      });

    this.updateVariantTypes();
  }

  updateVariantTypes(): void {
    this.variantTypeNames = this.variantTypeDataService.variantTypes.map(
      variantType => variantType.name);
  }

  variantTypeFilterChanged(variantType: any): void {
    this.variantTableFilterEvent.variantType = variantType;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.variantTableFilterEvent);
    }
  }

  clearFilter(): void {
    this.suppressChildEvent = true;

    this.variantTypeFilter.clearFilter();

    this.suppressChildEvent = false;
    this.filterChanged.emit(this.variantTableFilterEvent);
  }
}
