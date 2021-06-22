import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {StakeholderDataService} from '../../services/data/stakeholder-data.service';
import {LogService} from '../../services/log.service';
import {StakeholderTableFilterEvent} from './StakeholderTableFilterEvent';
import {ColumnCategoryFilterComponent} from '../column-category-filter/column-category-filter.component';
import {HighlightSearchComponent} from '../highlight-search/highlight-search.component';
import {PriorityFilterComponent} from '../priority-filter/priority-filter.component';
import {ColumnSliderFilterComponent} from '../column-slider-filter/column-slider-filter.component';

@Component({
  selector: 'app-stakeholders-filter-bar',
  templateUrl: './stakeholders-filter-bar.component.html',
  styleUrls: ['./stakeholders-filter-bar.component.scss']
})
export class StakeholdersFilterBarComponent {
  @ViewChild('levelFilter') levelFilter!: ColumnCategoryFilterComponent;
  @ViewChild(PriorityFilterComponent) priorityFilter!: PriorityFilterComponent;
  @ViewChild(ColumnSliderFilterComponent) impactedFilter!: ColumnSliderFilterComponent;
  @ViewChild(HighlightSearchComponent) highlightFilter!: HighlightSearchComponent;
  @Output() filterChanged = new EventEmitter<StakeholderTableFilterEvent>();

  stakeholderTableFilterEvent: StakeholderTableFilterEvent;
  suppressChildEvent = false;

  constructor(private logger: LogService,
              public stakeholderDataService: StakeholderDataService) {
    this.stakeholderTableFilterEvent = StakeholderTableFilterEvent.getDefault();
  }

  highlightTextChange(event: string): void {
    this.stakeholderTableFilterEvent.highlight = event;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.stakeholderTableFilterEvent);
    }
  }

  levelFilterChange(event: any): void {
    this.stakeholderTableFilterEvent.level = event;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.stakeholderTableFilterEvent);
    }
  }

  priorityFilterChange(value: any): void {
    this.stakeholderTableFilterEvent.priority = value;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.stakeholderTableFilterEvent);
    }
  }

  impactedFilterChange(value: any): void {
    this.stakeholderTableFilterEvent.impacted = value;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.stakeholderTableFilterEvent);
    }
  }

  clearFilter(): void {
    this.suppressChildEvent = true;

    this.highlightFilter.clearFilter();
    this.levelFilter.clearFilter();
    this.priorityFilter.clearFilter();
    this.impactedFilter.clearFilter();

    this.suppressChildEvent = false;
    this.filterChanged.emit(this.stakeholderTableFilterEvent);
  }
}