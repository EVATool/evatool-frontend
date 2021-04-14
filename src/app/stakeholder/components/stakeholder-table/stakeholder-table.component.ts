import {Component, Input, OnInit} from '@angular/core';
import {StakeholderDataService} from '../../service/stakeholder-data.service';
import {Stakeholder} from '../../model/Stakeholder';

@Component({
  selector: 'app-stakeholder-table',
  templateUrl: './stakeholder-table.component.html',
  styleUrls: ['./stakeholder-table.component.scss']
})
export class StakeholderTableComponent {

  public displayedColumns = ['guiId', 'Stakeholder', 'Ebene', 'Prio', 'Impact'];
  @Input() searchText: string | undefined;

  constructor(public stakeholderDataService: StakeholderDataService) {
  }


  addStakeholder(): void {
    this.stakeholderDataService.createStakeholder();
  }

  save(stakeholder: Stakeholder): void {
    if (stakeholder.editable !== true) {
      return;
    }
    stakeholder.editable = false;
    stakeholder.created = false;
    if (stakeholder.id === '') {
      this.stakeholderDataService.save(stakeholder);
    } else {
      this.stakeholderDataService.update(stakeholder);
    }

  }

  saveNotEdit(stakeholder: Stakeholder): void {
    stakeholder.editable = false;
    stakeholder.created = false;
    if (stakeholder.id === '') {
      this.stakeholderDataService.save(stakeholder);
    } else {
      this.stakeholderDataService.update(stakeholder);
    }
  }

  delete() {

  }
}
