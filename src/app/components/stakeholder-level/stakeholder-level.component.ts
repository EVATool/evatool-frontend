import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LogService} from '../../services/log.service';
import {StakeholderDataService} from '../../services/data/stakeholder-data.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-stakeholder-level',
  templateUrl: './stakeholder-level.component.html',
  styleUrls: ['./stakeholder-level.component.scss']
})
export class StakeholderLevelComponent {

  @Input() public level = 'INDIVIDUAL';
  @Input() public editable = true;
  @Input() public showDescription = true;
  @Input() public filterText = '';
  @Output() levelChange = new EventEmitter<string | null>();

  public shownLevels = [
    {key: 'INDIVIDUAL', value: 'Individual'},
    {key: 'ORGANIZATION', value: 'Organization'},
    {key: 'SOCIETY', value: 'Society'}
  ];

  constructor(private logger: LogService,
              public stakeholderData: StakeholderDataService,
              private translate: TranslateService) {
    this.translate.get('COMMON.PROPERTY.STAKEHOLDER.LEVEL_INDIVIDUAL', {value: 'world'}).subscribe((res: string) => {
      this.shownLevels[0].value = res;
    });

    this.translate.get('COMMON.PROPERTY.STAKEHOLDER.LEVEL_ORGANIZATION', {value: 'world'}).subscribe((res: string) => {
      this.shownLevels[1].value = res;
    });

    this.translate.get('COMMON.PROPERTY.STAKEHOLDER.LEVEL_SOCIETY', {value: 'world'}).subscribe((res: string) => {
      this.shownLevels[2].value = res;
    });
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
