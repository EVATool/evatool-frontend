import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LogService} from '../../services/log.service';

@Component({
  selector: 'app-filter-category',
  templateUrl: './filter-category.component.html',
  styleUrls: ['./filter-category.component.scss']
})
export class FilterCategoryComponent {
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
