import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {StakeholderPriorityComponent} from '../stakeholder-priority/stakeholder-priority.component';

@Component({
  selector: 'app-priority-filter',
  templateUrl: './priority-filter.component.html',
  styleUrls: ['./priority-filter.component.scss']
})
export class PriorityFilterComponent {

  @ViewChild(StakeholderPriorityComponent) stakeholderPriority!: StakeholderPriorityComponent;

  @Output() filterChanged = new EventEmitter<string[]>();

  prios: { [id: string]: boolean } = {};

  priorityFilterChange(event: string[]): void {
    this.filterChanged.emit(event);
  }

  clearFilter(): void {
    for (const p of this.stakeholderPriority.stakeholderData.stakeholderPriorities) {
      this.stakeholderPriority.priorities[p] = false;
    }
    this.filterChanged.emit([]);
  }
}
