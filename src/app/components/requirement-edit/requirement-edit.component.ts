import {Component, ViewChild} from '@angular/core';
import {RequirementTableComponent} from '../requirement-table/requirement-table.component';
import {RequirementFilterBarComponent} from '../requirement-filter-bar/requirement-filter-bar.component';
import {RequirementRestService} from '../../services/rest/requirement-rest.service';
import {RequirementDataService} from '../../services/data/requirement-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-requirement-edit',
  templateUrl: './requirement-edit.component.html',
  styleUrls: ['./requirement-edit.component.scss']
})
export class RequirementEditComponent {
  @ViewChild(RequirementTableComponent) table!: RequirementTableComponent;
  @ViewChild(RequirementFilterBarComponent) filterBar!: RequirementFilterBarComponent;

  constructor(
    private service: RequirementRestService,
    private dataService: RequirementDataService,
    private router: Router) {

  }

  tabActivated(): void {

  }
}
