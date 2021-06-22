import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LogService} from '../../services/log.service';
import {StakeholderDataService} from '../../services/data/stakeholder-data.service';

@Component({
  selector: 'app-stakeholder-level',
  templateUrl: './stakeholder-level.component.html',
  styleUrls: ['./stakeholder-level.component.scss']
})
export class StakeholderLevelComponent {

  @Input() public level = 'INDIVIDUAL';
  @Input() public editable = true;
  @Input() public showDescription = true;
  @Input() public filtertext = '';
  @Output() levelChange = new EventEmitter<string | null>();

  public shownlevels = [
    {key: 'INDIVIDUAL', value: 'Individuell'},
    {key: 'ORGANIZATION', value: 'Organisation'},
    {key: 'SOCIETY', value: 'Gesellschaft'}
  ];

  constructor(private logger: LogService,
              public stakeholderData: StakeholderDataService) {
  }

  onLevelChange(): void {
    if (!this.editable) {
      return;
    }
    const index = this.stakeholderData.stakeholderLevels.indexOf(this.level);
    const nextIndex = (index + 1) % this.stakeholderData.stakeholderLevels.length;
    this.level = this.stakeholderData.stakeholderLevels[nextIndex];
    this.levelChange.emit(this.level);
  }
}
