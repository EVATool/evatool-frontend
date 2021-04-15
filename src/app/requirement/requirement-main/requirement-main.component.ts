import {Requirements} from '../models/Requirements';
import {MatTable} from '@angular/material/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {RequirementsRestService} from "../services/requirements/requirements-rest.service";
import {Router} from "@angular/router";
import {RequirementsDataService} from "../services/requirements/requirements-data.service";

@Component({
  selector: 'app-requirement-main',
  templateUrl: './requirement-main.component.html',
  styleUrls: ['./requirement-main.component.css']
})
export class RequirementMainComponent implements OnInit, AfterViewInit  {
  @ViewChild(MatTable) table!: MatTable<any>;
  editField: string;
  data: Requirements[] = [];
  idForProject = '';
  private key = '';
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

  changeValue(id: number, property: string, event: any): any {
    this.editField = event.target.textContent;
  }

  addRequirements(): void {
    this.dataService.createRequirement(this.idForProject);
  }
}
