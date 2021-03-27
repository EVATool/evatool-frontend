import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Stakeholder} from '../../model/Stakeholder';

@Component({
  selector: 'app-stakeholder-prio',
  templateUrl: './stakeholder-prio.component.html',
  styleUrls: ['./stakeholder-prio.component.scss']
})
export class StakeholderPrioComponent implements OnInit {

  @Input() prio!: number;
  @Input() public editable = false;
  @Output() prioChange = new EventEmitter<number | null>();

  constructor() {
  }

  ngOnInit(): void {
  }

  updatePrio(prio: any, event: any): void{
    if (!this.editable) {return; }
    this.prio = prio;
    event.stopPropagation();
    this.prioChange.emit(this.prio);
  }

}
