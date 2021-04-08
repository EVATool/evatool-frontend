import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ColumnCategoryFilterComponent} from '../../../shared/components/column-category-filter/column-category-filter.component';
import{RequirementTableFilterEvent} from '../../../requirement/components/requirement-table-filter-bar/RequirementTableFilterEvent';
import {SliderFilterSettings} from '../../../shared/components/impact-slider/SliderFilterSettings';
import {ColumnSliderFilterComponent} from '../../../shared/components/column-slider-filter/column-slider-filter.component';
import {HighlightSearchComponent} from '../../../shared/components/search-bar/highlight-search.component';
import {DimensionDataService} from '../../../impact/services/dimension/dimension-data.service';
import {VariantsDataService} from '../../services/variants/variants-data.service';

@Component({
  selector: 'app-requirement-table-filter-bar',
  templateUrl: './requirement-table-filter-bar.component.html',
  styleUrls: ['./requirement-table-filter-bar.component.scss']
})
export class RequirementTableFilterBarComponent implements OnInit {
  @ViewChild(ColumnSliderFilterComponent) sliderFilter!: ColumnSliderFilterComponent;
  @ViewChild('variantsFilter') variantsFilter!: ColumnCategoryFilterComponent;
  @ViewChild('valueSystemFilter') valueSystemFilter!: ColumnCategoryFilterComponent;
  @ViewChild(HighlightSearchComponent) highlightFilter!: HighlightSearchComponent;
  @Output() filterChanged = new EventEmitter<RequirementTableFilterEvent>();
  variantsNames: string[] = [];
  valueSystemNames: string[] = [];

  requirementTableFilterEvent!: RequirementTableFilterEvent;
  suppressChildEvent = false;
  constructor(
    private variantsDataService: VariantsDataService,
    private dimensionDataService: DimensionDataService) {
    this.requirementTableFilterEvent = RequirementTableFilterEvent.getDefault();
  }

  ngOnInit(): void {
    // this.dimensionDataService.loadedDimensions.subscribe((dimensions)=>){
    //   this.valueSystemNames = dimensions.map(value => value.name);
    // }
  }

  variantsFilterChanged(event: string[]): void {
    this.requirementTableFilterEvent.variantsFilter = event;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.requirementTableFilterEvent);
    }
  }

  valueSystemFilterChanged(event: string[]): void {
    this.requirementTableFilterEvent.valueSystemFilter = event;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.requirementTableFilterEvent);
    }
  }
  valueFilterChanged(event: SliderFilterSettings): void {
    this.requirementTableFilterEvent.valueFilter = event;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.requirementTableFilterEvent);
    }
  }

  clearFilter(): void {
    this.suppressChildEvent = true;

    this.sliderFilter.clearFilter();
    this.variantsFilter.clearFilter();
    this.valueSystemFilter.clearFilter();

    this.suppressChildEvent = false;
    this.filterChanged.emit(this.requirementTableFilterEvent);
  }
  clearHighlight() {
    this.suppressChildEvent = true;

    this.highlightFilter.clearFilter();

    this.suppressChildEvent = false;
    this.filterChanged.emit(this.requirementTableFilterEvent);
  }
}
