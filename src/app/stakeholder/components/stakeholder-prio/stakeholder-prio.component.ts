import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-stakeholder-prio',
  templateUrl: './stakeholder-prio.component.html',
  styleUrls: ['./stakeholder-prio.component.scss']
})
export class StakeholderPrioComponent implements OnInit {
  @Input() priority!: number;
  @Output() valueChange = new EventEmitter<number | null>();
  constructor() { }

  ngOnInit(): void {
  }

}
