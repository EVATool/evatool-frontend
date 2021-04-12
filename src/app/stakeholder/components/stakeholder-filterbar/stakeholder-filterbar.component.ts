import { Component, OnInit } from '@angular/core';
import {StakeholderDataService} from '../../service/stakeholder-data.service';
import {StakeholderPrioComponent} from '../stakeholder-prio/stakeholder-prio.component';

@Component({
  selector: 'app-stakeholder-filterbar',
  templateUrl: './stakeholder-filterbar.component.html',
  styleUrls: ['./stakeholder-filterbar.component.scss']
})
export class StakeholderFilterbarComponent implements OnInit {

  public levels = [
      {key: '', value: 'Alle'},
      {key: 'NATURAL_PERSON' , value: 'Individuell'},
      {key: 'ORGANIZATION', value: 'Organisation'},
      {key: 'SOCIETY', value: 'Gesellschaft'}
    ];

  public preselect = this.levels[0];
  public prio = 0;
  constructor(public stakeholderDataService: StakeholderDataService) { }

  ngOnInit(): void {
  }

  impactChange(value: any): void{
    console.log(value);
    this.stakeholderDataService.filterImpact(value);
  }

  prioChange(value: any): void{
    console.log(value);
    this.stakeholderDataService.filterPrio(value);
  }

  levelChange(event: any): void{
    if (event.isUserInput)
    {
      this.stakeholderDataService.filterSetFilter();
    }
  }

  resetFilter(): void {
    this.prio = 0;
    this.preselect = this.levels[0];
    this.stakeholderDataService.resetFilter();
  }

  highlightTextChange(event: string): void {
    this.stakeholderDataService.setSearchText(event);
  }
}
