import {Requirements} from '../models/Requirements';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {ImpactDataService} from '../services/impact/impact-data.service';
import {Datagenerator} from '../services/datagenerator';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import {RequirementsTableComponent} from '../components/requirement-table/requirements-table.component';

@Component({
  selector: 'app-requirement-main',
  templateUrl: './requirement-main.component.html',
  styleUrls: ['./requirement-main.component.css']
})
export class RequirementMainComponent implements OnInit  {
  @ViewChild(MatTable) table!: MatTable<any>;
  editField: string;
  data: Requirements[] = [];
  private key = '';
  constructor(private datagenerator: Datagenerator,
              ) {
    this.editField = '';
  }

  ngOnInit(): void {
  }

  changeValue(id: number, property: string, event: any): any {
    this.editField = event.target.textContent;
  }


  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.ctrlKey && event.keyCode == 10){
    }
  }

  // addRequirements(): void {
  //   const requirementNew: Requirements = new Requirements();
  //   requirementNew.projectID = this.idForProject;
  //   const size: number = this.requirementsSource.length;
  //   if (size < 10){
  //     requirementNew.requirementTitle = 'RE0' + (size + 1);
  //   }else{
  //     requirementNew.requirementTitle = 'RE' + (size + 1);
  //   }
  //   requirementNew.requirementDescription = 'generated requirement';
  //   this.requirementsRestService.createRequirements(requirementNew).subscribe(value => {
  //     this.requirementsSource.push(value);
  //     this.tableDatasource = new MatTableDataSource<Requirements>(this.requirementsSource);
  //   });
  // }
}
