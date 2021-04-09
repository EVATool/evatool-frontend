import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-stakeholder-impact',
  templateUrl: './stakeholder-impact.component.html',
  styleUrls: ['./stakeholder-impact.component.scss']
})
export class StakeholderImpactComponent implements OnInit {

  @Input() negativeimpactvalue = 50;
  @Input() positiveimpactvalue = 50;
  @Input() editable = false;
  @Input() public created = false;
  @Output() impactChange = new EventEmitter<number | null>();
  public impactvaluetotal = 100;
  public impactIsNull = false;
  constructor() {
  }

  ngOnInit(): void {
    this.impactvaluetotal = this.negativeimpactvalue + this.positiveimpactvalue;
    if (this.impactvaluetotal === 0) {
      this.impactIsNull = true;
    }
  }

  onImpactChange(event: any): void{
    this.negativeimpactvalue = event.value;
    this.impactChange.emit(this.negativeimpactvalue);
  }
}
