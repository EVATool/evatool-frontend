import {Requirements} from '../models/Requirements';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {RequirementsRestService} from '../services/requirements/requirements-rest.service';
import {Router} from '@angular/router';
import {RequirementsDataService} from '../services/requirements/requirements-data.service';
import {RequirementTableFilterEvent} from '../components/requirement-table-filter-bar/RequirementTableFilterEvent';
import {RequirementTableFilterBarComponent} from '../components/requirement-table-filter-bar/requirement-table-filter-bar.component';
import {RequirementsTableComponent} from '../components/requirement-table/requirements-table.component';

@Component({
  selector: 'app-requirement-main',
  templateUrl: './requirement-main.component.html',
  styleUrls: ['./requirement-main.component.scss']
})
export class RequirementMainComponent implements OnInit, AfterViewInit  {
  @ViewChild(RequirementTableFilterBarComponent) filterBar!: RequirementTableFilterBarComponent;
  @ViewChild(RequirementsTableComponent) table!: RequirementsTableComponent;
  editField: string;
  data: Requirements[] = [];
  idForProject = '';
  constructor(
    private service: RequirementsRestService,
    private dataService: RequirementsDataService,
    private router: Router) {
    this.editField = '';
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.router.routerState.root.queryParams.subscribe(params => {
      this.idForProject = params.id;
    });
  }

  addRequirements(): void {
    this.dataService.createRequirement(this.idForProject);
  }
  filterBarChanged(event: RequirementTableFilterEvent): void {
    this.table.filterChange(event);
  }
  tabActivated(): void {
    this.table?.reload();
  }
}
