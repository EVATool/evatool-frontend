import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-priority-filter',
  templateUrl: './priority-filter.component.html',
  styleUrls: ['./priority-filter.component.scss']
})
export class PriorityFilterComponent {

  @Output() filterChanged = new EventEmitter<string[]>();

  priorityFilterChange(event: string[]): void {
    this.filterChanged.emit(event);
  }

  clearFilter(): void {
    // TODO

    this.filterChanged.emit();
  }
}
