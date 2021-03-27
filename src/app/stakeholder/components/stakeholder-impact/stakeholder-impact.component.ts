import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-stakeholder-impact',
  templateUrl: './stakeholder-impact.component.html',
  styleUrls: ['./stakeholder-impact.component.scss']
})
export class StakeholderImpactComponent implements OnInit {

  @Input() negativimpactvalue =  5.0;
  @Input() impactvaluetotal = 10.0;
  @Input() editable = false;
  @Output() impactChange = new EventEmitter<number | null>();
  constructor() { }

  ngOnInit(): void {
  }

  onImpactChange(): void{
    console.log(this.negativimpactvalue);
    this.impactChange.emit(this.negativimpactvalue);
  }
}
