import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {StakeholdersFilterBarComponent} from '../stakeholders-filter-bar/stakeholders-filter-bar.component';
import {StakeholdersTableComponent} from '../stakeholders-table/stakeholders-table.component';
import {LogService} from '../../services/log.service';
import {Stakeholder} from '../../model/Stakeholder';

@Component({
  selector: 'app-stakeholders',
  templateUrl: './stakeholders.component.html',
  styleUrls: ['./stakeholders.component.scss']
})
export class StakeholdersComponent {
  @ViewChild(StakeholdersTableComponent) table!: StakeholdersTableComponent;
  @ViewChild(StakeholdersFilterBarComponent) filterBar!: StakeholdersFilterBarComponent;
  @Output() userWantsToSeeReferencedImpacts: EventEmitter<Stakeholder> = new EventEmitter();

  constructor(private logger: LogService) {
  }
}
