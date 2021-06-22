import {Component, ViewChild} from '@angular/core';
import {RequirementsTableComponent} from '../requirements-table/requirements-table.component';
import {RequirementsFilterBarComponent} from '../requirements-filter-bar/requirements-filter-bar.component';
import {RequirementRestService} from '../../services/rest/requirement-rest.service';
import {RequirementDataService} from '../../services/data/requirement-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-requirement-edit',
  templateUrl: './requirement-edit.component.html',
  styleUrls: ['./requirement-edit.component.scss']
})
export class RequirementEditComponent {
  @ViewChild(RequirementsTableComponent) table!: RequirementsTableComponent;
  @ViewChild(RequirementsFilterBarComponent) filterBar!: RequirementsFilterBarComponent;

  constructor(
    private service: RequirementRestService,
    private dataService: RequirementDataService,
    private router: Router) {

  }

  tabActivated(): void {

  }
}
