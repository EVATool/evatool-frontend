import { Component, OnInit } from '@angular/core';
import {StakeholderDataService} from '../../service/stakeholder-data.service';
import {Stakeholder} from '../../model/Stakeholder';

@Component({
  selector: 'app-stakeholder-table',
  templateUrl: './stakeholder-table.component.html',
  styleUrls: ['./stakeholder-table.component.scss']
})
export class StakeholderTableComponent implements OnInit {

  public displayedColumns = ['guiId', 'Stakeholder', 'Ebene', 'Prio', 'Impact'];

  constructor(public stakeholderDataService: StakeholderDataService) { }

  ngOnInit(): void {
  }

  addStakeholder(): void {
    this.stakeholderDataService.createStakeholder();
  }

  save(stakeholder: Stakeholder): void{
      stakeholder.editable = false;
      stakeholder.created = false;
      this.stakeholderDataService.save(stakeholder);
  }

}
