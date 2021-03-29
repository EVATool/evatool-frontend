import { HighlightSearchComponent } from '../../../shared/components/search-bar/highlight-search.component';
import { DimensionDataService } from '../../services/dimension/dimension-data.service';
import { StakeholderDataService } from '../../services/stakeholder/stakeholder-data.service';
import { ColumnSliderFilterComponent } from '../../../shared/components/column-slider-filter/column-slider-filter.component';
import { ImpactTableFilterEvent } from './ImpactTableFilterEvent';
import { LogService } from '../../../shared/services/log.service';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { SliderFilterSettings } from 'src/app/shared/components/impact-slider/SliderFilterSettings';
import { ColumnCategoryFilterComponent } from '../../../shared/components/column-category-filter/column-category-filter.component';

@Component({
  selector: 'app-impact-table-filter-bar',
  templateUrl: './impact-table-filter-bar.component.html',
  styleUrls: ['./impact-table-filter-bar.component.scss']
})
export class ImpactTableFilterBarComponent implements OnInit {
  @ViewChild(ColumnSliderFilterComponent) sliderFilter!: ColumnSliderFilterComponent;
  @ViewChild('stakeholderFiler') stakeholderFilter!: ColumnCategoryFilterComponent;
  @ViewChild('dimensionFilter') dimensionsFilter!: ColumnCategoryFilterComponent;
  @ViewChild(HighlightSearchComponent) highlightFilter!: HighlightSearchComponent;
  @Output() filterChanged = new EventEmitter<ImpactTableFilterEvent>();

  stakeholderNames: string[] = [];
  dimensionNames: string[] = [];

  impactTableFilterEvent: ImpactTableFilterEvent;
  suppressChildEvent = false;

  constructor(
    private logger: LogService,
    private stakeholderDataService: StakeholderDataService,
    private dimensionDataService: DimensionDataService) {
    this.impactTableFilterEvent = ImpactTableFilterEvent.getDefault();
  }

  ngOnInit(): void {
    this.stakeholderDataService.loadedStakeholders.subscribe((stakeholders) => {
      this.stakeholderNames = stakeholders.map(value => value.name);
    });

    this.dimensionDataService.loadedDimensions.subscribe((dimensions) => {
      this.dimensionNames = dimensions.map(value => value.name);
    });
  }

  valueFilterChanged(event: SliderFilterSettings): void {
    this.logger.info(this, 'Slider Filter Changed');
    this.impactTableFilterEvent.valueFilter = event;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.impactTableFilterEvent);
    }
  }

  stakeholderFilterChanged(event: string[]): void {
    this.logger.info(this, 'Slider Filter Changed (Stakeholder)');
    this.impactTableFilterEvent.stakeholderFilter = event;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.impactTableFilterEvent);
    }
  }

  dimensionFilterChanged(event: string[]): void {
    this.logger.info(this, 'Slider Filter Changed (Dimension)');
    this.impactTableFilterEvent.dimensionFilter = event;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.impactTableFilterEvent);
    }
  }

  highlightTextChange(event: string): void {
    this.logger.info(this, 'Highlight Text Changed');
    this.impactTableFilterEvent.highlightFilter = event;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.impactTableFilterEvent);
    }
  }

  clearFilter(): void {
    this.logger.info(this, 'Clearing Filtering');
    this.suppressChildEvent = true;

    this.sliderFilter.clearFilter();
    this.stakeholderFilter.clearFilter();
    this.dimensionsFilter.clearFilter();

    this.suppressChildEvent = false;
    this.filterChanged.emit(this.impactTableFilterEvent);
  }

  clearHighlight() {
    this.logger.info(this, 'Clearing Highlighting');
    this.suppressChildEvent = true;

    this.highlightFilter.clearFilter();

    this.suppressChildEvent = false;
    this.filterChanged.emit(this.impactTableFilterEvent);
  }
}
