import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LogService} from '../../../../services/log.service';
import {StakeholderDataService} from '../../../../services/data/stakeholder-data.service';

@Component({
  selector: 'app-stakeholders-priority',
  templateUrl: './stakeholders-priority.component.html',
  styleUrls: ['./stakeholders-priority.component.scss']
})
export class StakeholdersPriorityComponent {

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
      console.log(prio);
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
