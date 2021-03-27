import { Component, OnInit } from '@angular/core';
import {StakeholderDataService} from '../../service/stakeholder-data.service';

@Component({
  selector: 'app-stakeholder-filterbar',
  templateUrl: './stakeholder-filterbar.component.html',
  styleUrls: ['./stakeholder-filterbar.component.scss']
})
export class StakeholderFilterbarComponent implements OnInit {

  public levels = [{key: 'NATURAL_PERSON' , value: 'Individuell'}, {key: 'ORGANIZATION', value: 'Organisation'}, {key: 'SOCIETY', value: 'Gesellschaft'}, {key: '', value: 'Alle'}];
  public preselect = this.levels[4];
  constructor(public stakeholderDataService: StakeholderDataService) { }

  ngOnInit(): void {
  }

  impactChange(value: any): void{
    console.log(value);
  }

  prioChange(value: any): void{
    console.log(value);
    this.stakeholderDataService.filterPrio(value);
  }

  levelChange(event: any): void{
    if (event.isUserInput)
    {
      this.stakeholderDataService.filterLevel(event.source.value.key);
    }
  }

  resetFilter(): void {
    this.stakeholderDataService.resetFilter();
  }
}
