import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LogService} from '../../services/log.service';
import {StakeholderDataService} from '../../services/data/stakeholder-data.service';

@Component({
  selector: 'app-stakeholder-priority',
  templateUrl: './stakeholder-priority.component.html',
  styleUrls: ['./stakeholder-priority.component.scss']
})
export class StakeholderPriorityComponent {

  @Input() prio!: string;
  @Input() public editable = true;
  @Output() prioChange = new EventEmitter<string>();
  @Output() priosChange = new EventEmitter<string[]>();

  @Input() isFilter = false;
  @Input() priorities: { [id: string]: boolean } = {};

  constructor(private logger: LogService,
              public stakeholderData: StakeholderDataService) {
  }

  updatePrio(prio: any, event: any): void {
    if (!this.editable) {
      return;
    }
    if (this.isFilter) {
      this.priorities[prio] = !this.priorities[prio];
      const prios: string[] = [];
      for (const p of this.stakeholderData.stakeholderPriorities) {
        if (this.priorities[p]) {
          prios.push(p);
        }
      }
      this.priosChange.emit(prios);
    } else {
      this.prio = prio;
      event.stopPropagation();
      this.prioChange.emit(this.prio);
    }
  }

  getShowPrio(prio: string, position: number): boolean {
    if (this.isFilter) {
      return this.priorities[this.stakeholderData.stakeholderPriorities[position]];
    } else {
      const prioNumber = this.stakeholderData.stakeholderPriorities.indexOf(prio);
      return prioNumber >= position;
    }
  }
}
