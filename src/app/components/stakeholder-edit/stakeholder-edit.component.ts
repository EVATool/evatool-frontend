import {Component, ViewChild} from '@angular/core';
import {StakeholderFilterBarComponent} from '../stakeholder-filter-bar/stakeholder-filter-bar.component';
import {StakeholderTableComponent} from '../stakeholder-table/stakeholder-table.component';
import {LogService} from '../../services/log.service';

@Component({
  selector: 'app-stakeholder-edit',
  templateUrl: './stakeholder-edit.component.html',
  styleUrls: ['./stakeholder-edit.component.scss']
})
export class StakeholderEditComponent {
  @ViewChild(StakeholderTableComponent) table!: StakeholderTableComponent;
  @ViewChild(StakeholderFilterBarComponent) filterBar!: StakeholderFilterBarComponent;

  constructor(private logger: LogService) {
  }
}
