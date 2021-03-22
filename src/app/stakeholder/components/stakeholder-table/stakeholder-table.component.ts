import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stakeholder-table',
  templateUrl: './stakeholder-table.component.html',
  styleUrls: ['./stakeholder-table.component.scss']
})
export class StakeholderTableComponent implements OnInit {

  public displayedColumns = ['Stakeholder', 'Prio', 'Impact'];

  constructor() { }

  ngOnInit(): void {
  }

}
