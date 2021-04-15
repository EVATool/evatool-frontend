import { Component } from '@angular/core';
import {StakeholderDataService} from '../../service/stakeholder-data.service';

@Component({
  selector: 'app-stakeholder-filterbar',
  templateUrl: './stakeholder-filterbar.component.html',
  styleUrls: ['./stakeholder-filterbar.component.scss']
})
export class StakeholderFilterbarComponent{

  public levels = [
      {key: '', value: 'Alle'},
      {key: 'NATURAL_PERSON' , value: 'Individuell'},
      {key: 'ORGANIZATION', value: 'Organisation'},
      {key: 'SOCIETY', value: 'Gesellschaft'}
    ];

  public preselect = this.levels[0];
  public prio = 0;
  constructor(public stakeholderDataService: StakeholderDataService) { }

  impactChange(value: any): void{
    this.stakeholderDataService.filterImpact(value);
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
    this.prio = 0;
    this.preselect = this.levels[0];
    this.stakeholderDataService.resetFilter();
  }

  highlightTextChange(event: string): void {
    this.stakeholderDataService.setSearchText(event);
  }
}
