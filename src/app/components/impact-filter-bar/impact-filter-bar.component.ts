import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FilterSliderComponent} from '../filter-impact/filter-slider.component';
import {ColumnCategoryFilterComponent} from '../column-category-filter/column-category-filter.component';
import {HighlightSearchComponent} from '../highlight-search/highlight-search.component';
import {ImpactTableFilterEvent} from './ImpactTableFilterEvent';
import {LogService} from '../../services/log.service';
import {StakeholderDataService} from '../../services/data/stakeholder-data.service';
import {ValueDataService} from '../../services/data/value-data.service';
import {SliderFilterSettings} from '../impact-slider/SliderFilterSettings';
import {Value} from '../../model/Value';
import {Stakeholder} from '../../model/Stakeholder';

@Component({
  selector: 'app-impact-filter-bar',
  templateUrl: './impact-filter-bar.component.html',
  styleUrls: ['./impact-filter-bar.component.scss']
})
export class ImpactFilterBarComponent implements OnInit {
  @ViewChild(FilterSliderComponent) meritFilter!: FilterSliderComponent;
  @ViewChild('stakeholderFilter') stakeholderFilter!: ColumnCategoryFilterComponent;
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
    this.stakeholderDataService.loadedStakeholders.subscribe((stakeholders: Stakeholder[]) => {
      this.updateStakeholders();
    });

    this.stakeholderDataService.createdStakeholder.subscribe((stakeholder: Stakeholder) => {
      this.updateStakeholders();
    });

    this.stakeholderDataService.updatedStakeholder.subscribe((stakeholder: Stakeholder) => {
      this.updateStakeholders();
    });

    this.stakeholderDataService.deletedStakeholder.subscribe((stakeholder: Stakeholder) => {
      this.updateStakeholders();
    });

    this.updateStakeholders();

    this.valueDataService.loadedValues.subscribe((values: Value[]) => {
      this.updateValues();
    });

    this.valueDataService.createdValue.subscribe((value: Value) => {
      this.updateValues();
    });

    this.valueDataService.updatedValue.subscribe((value: Value) => {
      this.updateValues();
    });

    this.valueDataService.deletedValue.subscribe((value: Value) => {
      this.updateValues();
    });

    this.updateValues();
  }

  updateStakeholders(): void {
    this.stakeholderNames = this.stakeholderDataService.stakeholders.map(
      stakeholder => stakeholder.name);
  }

  updateValues(): void {
    this.valueNames = this.valueDataService.values.filter(
      value => !value.archived).map(
        value => value.name);
  }

  highlightTextChange(event: string): void {
    this.logger.info(this, 'Highlight Text Changed');
    this.impactTableFilterEvent.highlight = event;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.impactTableFilterEvent);
    }
  }

  stakeholderFilterChanged(event: string[]): void {
    this.logger.info(this, 'Slider Filter Changed (Stakeholder)');
    this.impactTableFilterEvent.stakeholder = event;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.impactTableFilterEvent);
    }
  }

  valueFilterChanged(event: string[]): void {
    this.logger.info(this, 'Slider Filter Changed (Value)');
    this.impactTableFilterEvent.value = event;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.impactTableFilterEvent);
    }
  }

  meritFilterChanged(event: SliderFilterSettings): void {
    this.logger.info(this, 'Slider Filter Changed');
    this.impactTableFilterEvent.merit = event;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.impactTableFilterEvent);
    }
  }

  clearFilter(): void {
    this.logger.info(this, 'Clearing Filtering');
    this.suppressChildEvent = true;

    this.highlightFilter.clearFilter();
    this.stakeholderFilter.clearFilter();
    this.valuesFilter.clearFilter();
    this.meritFilter.clearFilter();

    this.suppressChildEvent = false;
    this.filterChanged.emit(this.impactTableFilterEvent);
  }
}
