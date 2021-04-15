import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-stakeholder-prio',
  templateUrl: './stakeholder-prio.component.html',
  styleUrls: ['./stakeholder-prio.component.scss']
})
export class StakeholderPrioComponent {

  @Input() prio!: number;
  @Input() public editable = true;
  @Output() prioChange = new EventEmitter<number>();

  constructor() {}

  updatePrio(prio: any, event: any): void{
    if (!this.editable) {return; }
    this.prio = prio;
    event.stopPropagation();
    this.prioChange.emit(this.prio);
  }

}
