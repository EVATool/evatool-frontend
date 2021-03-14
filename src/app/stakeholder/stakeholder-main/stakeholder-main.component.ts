import {Component, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-stakeholder-main',
  templateUrl: './stakeholder-main.component.html',
  styleUrls: ['./stakeholder-main.component.css']
})
export class StakeholderMainComponent {
  @ViewChild(MatTable) table!: MatTable<any>;


  constructor() {}

  ngOnInit(): void {
  }

}
