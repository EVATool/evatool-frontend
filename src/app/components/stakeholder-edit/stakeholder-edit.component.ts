import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {StakeholderFilterBarComponent} from '../stakeholder-filter-bar/stakeholder-filter-bar.component';
import {StakeholderTableComponent} from '../stakeholder-table/stakeholder-table.component';
import {LogService} from '../../services/log.service';
import {Stakeholder} from '../../model/Stakeholder';

@Component({
  selector: 'app-stakeholder-edit',
  templateUrl: './stakeholder-edit.component.html',
  styleUrls: ['./stakeholder-edit.component.scss']
})
export class StakeholderEditComponent {
  @ViewChild(StakeholderTableComponent) table!: StakeholderTableComponent;
  @ViewChild(StakeholderFilterBarComponent) filterBar!: StakeholderFilterBarComponent;
  @Output() userWantsToSeeReferencedImpacts: EventEmitter<Stakeholder> = new EventEmitter();

  constructor(private logger: LogService) {
  }
}
