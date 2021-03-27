import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stakeholder-filterbar',
  templateUrl: './stakeholder-filterbar.component.html',
  styleUrls: ['./stakeholder-filterbar.component.scss']
})
export class StakeholderFilterbarComponent implements OnInit {

  public levels = ['NATURAL_PERSON', 'ORGANIZATION', 'SOCIETY', ''];
  constructor() { }

  ngOnInit(): void {
  }

  impactChange(value: any): void{
    console.log(value);
  }

  prioChange(value: any): void{
    console.log(value);
  }
}
