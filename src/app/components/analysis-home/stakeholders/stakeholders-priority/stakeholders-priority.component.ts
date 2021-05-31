import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LogService} from '../../../../services/log.service';
import {StakeholderDataService} from '../../../../services/data/stakeholder-data.service';

@Component({
  selector: 'app-stakeholders-priority',
  templateUrl: './stakeholders-priority.component.html',
  styleUrls: ['./stakeholders-priority.component.scss']
})
export class StakeholdersPriorityComponent {

  // TODO isFilter
  @Input() prio!: string;
  @Input() public editable = true;
  @Output() prioChange = new EventEmitter<string>();

  constructor(private logger: LogService,
              public stakeholderData: StakeholderDataService) {
  }

  updatePrio(prio: any, event: any): void {
    if (!this.editable) {
      return;
    }
    this.prio = prio;
    event.stopPropagation();
    this.prioChange.emit(this.prio);
  }

  getShowPrio(prio: string, position: number): boolean {
    let prioNumber = this.stakeholderData.stakeholderPriorities.indexOf(prio);
    return prioNumber >= position;
  }
}
