import {HighlightSearchComponent} from '../../../shared/components/search-bar/highlight-search.component';
import {ValueDataService} from '../../services/value/value-data.service';
import {StakeholderDataService} from '../../services/stakeholder/stakeholder-data.service';
import {ColumnSliderFilterComponent} from '../../../shared/components/column-slider-filter/column-slider-filter.component';
import {ImpactTableFilterEvent} from './ImpactTableFilterEvent';
import {LogService} from '../../../shared/services/log.service';
import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {SliderFilterSettings} from 'src/app/shared/components/impact-slider/SliderFilterSettings';
import {ColumnCategoryFilterComponent} from '../../../shared/components/column-category-filter/column-category-filter.component';
import {Value} from "../../models/Value";
import {Stakeholder} from "../../models/Stakeholder";

@Component({
  selector: 'app-impact-table-filter-bar',
  templateUrl: './impact-table-filter-bar.component.html',
  styleUrls: ['./impact-table-filter-bar.component.scss']
})
export class ImpactTableFilterBarComponent implements OnInit {
  @ViewChild(ColumnSliderFilterComponent) sliderFilter!: ColumnSliderFilterComponent;
  @ViewChild('stakeholderFiler') stakeholderFilter!: ColumnCategoryFilterComponent;
  @ViewChild('valuesFilter') valuesFilter!: ColumnCategoryFilterComponent;
  @ViewChild(HighlightSearchComponent) highlightFilter!: HighlightSearchComponent;
  @Output() filterChanged = new EventEmitter<ImpactTableFilterEvent>();

  stakeholderNames: string[] = [];
  valueNames: string[] = [];

  impactTableFilterEvent: ImpactTableFilterEvent;
  suppressChildEvent = false;

  constructor(
    private logger: LogService,
    private stakeholderDataService: StakeholderDataService,
    private valueDataService: ValueDataService) {
    this.impactTableFilterEvent = ImpactTableFilterEvent.getDefault();
  }

  ngOnInit(): void {
    this.stakeholderDataService.loadedStakeholders.subscribe((stakeholders) => {
      this.stakeholdersChanged(stakeholders);
    });

    this.valueDataService.loadedValues.subscribe((values) => {
      this.valuesChanged(values);
    });
    this.valueDataService.changedValues.subscribe((values) => {
      this.valuesChanged(values);
    });
  }

  stakeholdersChanged(stakeholders: Stakeholder[]) {
    this.stakeholderNames = stakeholders.map(value => value.name);
  }

  valuesChanged(values: Value[]) {
    this.valueNames = values.filter(value => !value.disable).map(value => value.name);
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

  valuesFilterChanged(event: string[]): void {
    this.logger.info(this, 'Slider Filter Changed (Value)');
    this.impactTableFilterEvent.valuesFilter = event;
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
    this.valuesFilter.clearFilter();

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
