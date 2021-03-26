
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {Datagenerator} from '../../services/datagenerator';
import {Requirements} from '../../models/Requirements';
import {Dimension} from '../../models/Dimension';
import {Impact} from '../../models/Impact';
import {MatTableDataSource} from '@angular/material/table';
import {RequirementsRestService} from '../../services/requirements/requirements-rest.service';

@Component({
  selector: 'app-requirement-table',
  templateUrl: './requirements-table.component.html',
  styleUrls: ['./requirements-table.component.css', '../../../layout/style/style.css']
})
export class RequirementsTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [];
  requirementsSource: Requirements[] = [];
  impactSoureces: Impact[] = [];
  tableDatasource: MatTableDataSource<Requirements>;
  idForProject = '';
  constructor(private datagenerator: Datagenerator,
              private requirementsRestService: RequirementsRestService) {
    this.requirementsRestService.getRequirements().subscribe((result: any) => {
      this.requirementsSource = [];
      result.forEach((requirementRest: Requirements) => {
        const requirement: Requirements = {
          rootEntityId : requirementRest.rootEntityId,
          projectID : requirementRest.projectID,
          requirementTitle : requirementRest.requirementTitle,
          requirementDescription : requirementRest.requirementDescription,
          dimensions : requirementRest.dimensions,
          impactDescription : requirementRest.impactDescription,
          // requirementImpactPoints : new Map(Object.entries(requirementRest.requirementImpactPoints)),
          requirementImpactPoints : requirementRest.requirementImpactPoints,
          variantsTitle : requirementRest.variantsTitle
        };
        this.idForProject = requirement.projectID;
        this.requirementsSource.push(requirement);
      });
      this.tableDatasource = new MatTableDataSource<Requirements>(this.requirementsSource);
    });
    this.requirementsRestService.getImpacts().subscribe((result: any) => {
      this.impactSoureces = [];
      result.forEach((impactRest: Impact) => {
        const impact: Impact = {
          id: impactRest.id,
          description: impactRest.description,
          value: impactRest.value,
          dimension: impactRest.dimension
        };
        this.impactSoureces.push(impact);
      });
      let impactIdList: string[] = [];
      this.impactSoureces.forEach(value => impactIdList = impactIdList.concat(value.id));
      this.displayedColumns = ['ID', 'Requirements', 'Variants', 'Dimension'];
      this.displayedColumns = this.displayedColumns.concat(impactIdList);
    });
    // this.requirementsSource = datagenerator.getRequirements();
    // this.impactSoureces = datagenerator.getImpacts();
    this.tableDatasource = new MatTableDataSource<Requirements>(this.requirementsSource);
  }

  ngOnInit(): void {
    this.datagenerator.onCreateImpact.subscribe(value => {
      this.tableDatasource = new MatTableDataSource<Requirements>(this.requirementsSource);
    });
  }

  ngAfterViewInit(): void {
  }

  concatDimension(parameter: any): string {
    let value = '';
    const dimension: [] = parameter.dimensions;
    if (dimension == null){ return value; }
    dimension.forEach(value1 => value = value.concat(value1, '\n'));
    return value;
  }

  concatVariants(element: any): string {
    let value = '';
    const variants: any = element.variantsTitle;
    if (variants == null){ return value; }
    Object.keys(variants).forEach(value1 => value = value.concat(variants[value1], '\n'));
    return value;
  }

  checkValue(element: Requirements, impact: Impact): string{
    let value = '';
    if (element.requirementImpactPoints == null){ return value; }
    if (element.requirementImpactPoints[impact.id] != null){
      const points: number | undefined = element.requirementImpactPoints[impact.id];
      if (points && 0 < points){
        value = '' + points;
      }else{
        value = '' + points;
      }
    }
    return  value;
  }

  isPositiv(element: Requirements, impact: Impact): boolean {
    if (element.requirementImpactPoints == null){ return false; }
    if (element.requirementImpactPoints[impact.id] != null){
      const points: number | undefined = element.requirementImpactPoints[impact.id];
      if (points && 0 < points) {
        return true;
      }
    }
    return false;
  }

  isNegativ(element: Requirements, impact: Impact): boolean {
    if (element.requirementImpactPoints == null){ return false; }
    if (element.requirementImpactPoints[impact.id] != null){
      const points: number | undefined = element.requirementImpactPoints[impact.id];
      if (points && 0 > points) {
        return true;
      }
    }
    return false;
  }

  clickFunction(element: Requirements, impact: Impact): void {
    if (element.requirementImpactPoints == null){ element.requirementImpactPoints = {}; }
    if (element.requirementImpactPoints[impact.id] == null){
      element.requirementImpactPoints[impact.id] = 1;
    } else if (element.requirementImpactPoints[impact.id] === 1){
      element.requirementImpactPoints[impact.id] = -1;
    } else {
      delete element.requirementImpactPoints[impact.id];
    }
    if (element.rootEntityId != null) {
      this.requirementsRestService.updateRequirements(element).subscribe(value => {
        this.ngOnInit();
      });
    }else{
      this.requirementsRestService.createRequirements(element).subscribe(value => {
        this.requirementsSource.pop();
        this.requirementsSource.push(value);
        this.tableDatasource = new MatTableDataSource<Requirements>(this.requirementsSource);
      });
    }
  }

  addRequirements(): void {
    const requirementNew: Requirements = new Requirements();
    requirementNew.projectID = this.idForProject;
    const size: number = this.requirementsSource.length;
    if (size < 10){
      requirementNew.requirementTitle = 'RE0' + (size + 1);
    }else{
      requirementNew.requirementTitle = 'RE' + (size + 1);
    }
    requirementNew.requirementDescription = 'generated requirement';
    this.requirementsSource.push(requirementNew);
    this.tableDatasource = new MatTableDataSource<Requirements>(this.requirementsSource);
  }
}