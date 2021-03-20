import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCheckboxChange} from '@angular/material/checkbox';

@Component({
  selector: 'app-column-category-filter',
  templateUrl: './column-category-filter.component.html',
  styleUrls: ['./column-category-filter.component.css']
})
export class ColumnCategoryFilterComponent implements OnInit {
  @Input() categories: string[] = [];
  @Input() name = '';

  @Output() filterChanged = new EventEmitter<string[]>();

  public filterValues: string[] = [];
  public isVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }

  setInvisible(): void {
    this.isVisible = false;
  }

  updateFilterValues(event: MatCheckboxChange): void {
    if (event.checked) {
      this.filterValues.push(event.source.value);
    } else {
      const index = this.filterValues.indexOf(event.source.value);
      if (index < 0) {
        return;
      }
      this.filterValues.splice(index, 1);
    }

    this.filterChanged.emit(this.filterValues);
    console.log('emit new filterValues: ' + this.filterValues);
  }
}