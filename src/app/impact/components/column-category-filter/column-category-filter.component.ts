import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LogService} from '../../../shared/services/log.service';

@Component({
  selector: 'app-column-category-filter',
  templateUrl: './column-category-filter.component.html',
  styleUrls: ['./column-category-filter.component.scss']
})
export class ColumnCategoryFilterComponent implements OnInit {
  @Input() categories: string[] = [];
  @Input() name = 'Filter';
  @Output() filterChanged = new EventEmitter<string[]>();

  public filterValues: string[] = [];

  constructor(private logger: LogService) {
  }

  ngOnInit(): void {
  }

  updateFilter(): void {
    this.logger.debug(this, 'New Filter for ' + this.name + ': ' + this.filterValues);
    this.filterChanged.emit(this.filterValues);
  }

  clearFilter(): void {
    this.filterValues = [];
    this.filterChanged.emit(this.filterValues);
  }
}
