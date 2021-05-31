import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LogService} from '../../services/log.service';

@Component({
  selector: 'app-column-category-filter',
  templateUrl: './column-category-filter.component.html',
  styleUrls: ['./column-category-filter.component.scss']
})
export class ColumnCategoryFilterComponent {
  @Input() categories: string[] = [];
  @Input() name = 'Filter';
  @Output() filterChanged = new EventEmitter<string[]>();

  public filterValues: string[] = [];

  constructor(private logger: LogService) {
  }

  updateFilter(): void {
    this.logger.debug(this, 'New Filter for ' + this.name + ': ' + this.filterValues);
    this.filterChanged.emit(this.filterValues);
  }

  clearFilter(): void {
    this.logger.debug(this, 'Clear ' + this.name + '-filter');
    this.filterValues = [];
    this.filterChanged.emit(this.filterValues);
  }
}
