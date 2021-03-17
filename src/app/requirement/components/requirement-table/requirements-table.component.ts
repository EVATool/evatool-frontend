
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

  displayedColumns: string[];
  requirementsSource: Requirements[] = [];
  impactSoureces: Impact[];
  tableDatasource: MatTableDataSource<Requirements>;
  constructor(private datagenerator: Datagenerator,
              private requirementsRestService: RequirementsRestService) {
    this.requirementsRestService.getRequirements().subscribe((result: any) => {
      this.requirementsSource = [];
      result.forEach((requirementRest: any) => {
        const requirement: Requirements = {
          rootid : requirementRest.rootEntityId,
          projetid : requirementRest.projectID,
          requirementTitle : requirementRest.requirementTitle,
          requirementDescription : requirementRest.requirementDescription,
          dimensions : requirementRest.dimensions,
          impactDescription : requirementRest.impactDescription,
          requirementImpactPoints : requirementRest.requirementImpactPoints,
          variantsTitle : requirementRest.variantsTitle
        };
        this.requirementsSource.push(requirement);
      });
      this.tableDatasource = new MatTableDataSource<Requirements>(this.requirementsSource);
    });
    // this.requirementsSource = datagenerator.getRequirements();
    this.impactSoureces = datagenerator.getImpacts();
    let impactIdList: string[] = [];
    this.impactSoureces.forEach(value => impactIdList = impactIdList.concat(value.id));
    this.displayedColumns = ['ID', 'Requirements', 'Variants', 'Dimension'];
    this.displayedColumns = this.displayedColumns.concat(impactIdList);
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
    dimension.forEach(value1 => value = value.concat(value1, '\n'));
    return value;
  }

  concatVariants(element: any): string {
    let value = '';
    const variants: any = element.variantsTitle;
    Object.keys(variants).forEach(value1 => value = value.concat(variants[value1], '\n'));
    return value;
  }

  checkValue(element: Requirements, impact: Impact): string{
    let value = '';
    if (element.requirementImpactPoints.has(impact.id)){
      const points: number | undefined = element.requirementImpactPoints.get(impact.id);
      if (points && 0 < points){
        value = '' + points;
      }else{
        value = '' + points;
      }
    }
    return  value;
  }

  isPositiv(element: Requirements, impact: Impact): boolean {
    if (element.requirementImpactPoints.has(impact.id)){
      const points: number | undefined = element.requirementImpactPoints.get(impact.id);
      if (points && 0 < points) {
        return true;
      }
    }
    return false;
  }

  isNegativ(element: Requirements, impact: Impact): boolean {
    if (element.requirementImpactPoints.has(impact.id)){
      const points: number | undefined = element.requirementImpactPoints.get(impact.id);
      if (points && 0 > points) {
        return true;
      }
    }
    return false;
  }

  clickFunction(element: Requirements, impact: Impact): void {
    if (element.requirementImpactPoints.has(impact.id)){
      element.requirementImpactPoints.set(impact.id, 1);
    } else if (element.requirementImpactPoints.get(impact.id) === 1){
      element.requirementImpactPoints.set(impact.id, -1);
    } else {
      element.requirementImpactPoints.delete(impact.id);
    }
  }
}
