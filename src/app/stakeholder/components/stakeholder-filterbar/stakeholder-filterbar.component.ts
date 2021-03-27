import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stakeholder-filterbar',
  templateUrl: './stakeholder-filterbar.component.html',
  styleUrls: ['./stakeholder-filterbar.component.scss']
})
export class StakeholderFilterbarComponent implements OnInit {

  public levels = ['natural person', 'organization', 'society', ''];
  constructor() { }

  ngOnInit(): void {
  }

}
