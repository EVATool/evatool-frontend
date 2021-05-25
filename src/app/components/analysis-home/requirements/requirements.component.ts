import {Component, OnInit, ViewChild} from '@angular/core';
import {RequirementsTableComponent} from "./requirements-table/requirements-table.component";
import {RequirementsFilterBarComponent} from "./requirements-filter-bar/requirements-filter-bar.component";
import {RequirementRestService} from "../../../services/rest/requirement-rest.service";
import {RequirementDataService} from "../../../services/data/requirement-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.scss']
})
export class RequirementsComponent implements OnInit {
  @ViewChild(RequirementsTableComponent) table!: RequirementsTableComponent;
  @ViewChild(RequirementsFilterBarComponent) filterBar!: RequirementsFilterBarComponent;

  constructor(
    private service: RequirementRestService,
    private dataService: RequirementDataService,
    private router: Router) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  tabActivated(): void {

  }
}