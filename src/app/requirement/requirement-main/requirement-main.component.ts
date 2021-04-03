import {Requirements} from '../models/Requirements';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {ImpactDataService} from '../services/impact/impact-data.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import {RequirementsTableComponent} from '../components/requirement-table/requirements-table.component';
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


  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.keyCode === 10){
    }
  }

  addRequirements(): void {
    this.dataService.createRequirement(this.idForProject);
  }
}
