import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-stakeholder-table',
  templateUrl: './stakeholder-table.component.html',
  styleUrls: ['./stakeholder-table.component.scss']
})
export class StakeholderTableComponent implements OnInit {

  public displayedColumns = ['guiId', 'Stakeholder', 'Ebene', 'Prio', 'Impact'];
  matDataSource: any = new MatTableDataSource<any>([{guiId: '1', Stakeholder: 'TEST'}, {guiId: '2', Stakeholder: 'TEST'}]);

  constructor() { }

  ngOnInit(): void {
  }

}
