import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stakeholder-impact',
  templateUrl: './stakeholder-impact.component.html',
  styleUrls: ['./stakeholder-impact.component.scss']
})
export class StakeholderImpactComponent implements OnInit {

  @Input() impactvalue = 0.0;
  constructor() { }

  ngOnInit(): void {
  }

}
