
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {Datagenerator} from '../../services/datagenerator';
import {Requirements} from '../../models/Requirements';
import {Dimension} from '../../models/Dimension';
import {Impact} from '../../models/Impact';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-requirement-table',
  templateUrl: './requirements-table.component.html',
  styleUrls: ['./requirements-table.component.css', '../../../layout/style/style.css']
})
export class RequirementsTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[];
  requirementsSource: Requirements[];
  impactSoureces: Impact[];
  tableDatasource: MatTableDataSource<Requirements>;
  constructor(private datagenerator: Datagenerator) {
    this.requirementsSource = datagenerator.getRequirements();
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
    const dimension: Set<Dimension> = parameter.dimensions;
    dimension.forEach(value1 => value = value.concat(value1.name, '\n'));
    return value;
  }

  concatVariants(element: any): string {
    let value = '';
    const variants: Map<string, string> = element.variantsTitle;
    variants.forEach(value1 => value = value.concat(value1, '\n'));
    return value;
  }

  checkValue(element: Requirements, impact: Impact): string{
    let value = '';
    if (element.requirementImpactPoints.get(impact.id) != null){
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
    if (element.requirementImpactPoints.get(impact.id) != null){
      const points: number | undefined = element.requirementImpactPoints.get(impact.id);
      if (points && 0 < points) {
        return true;
      }
    }
    return false;
  }

  isNegativ(element: Requirements, impact: Impact): boolean {
    if (element.requirementImpactPoints.get(impact.id) != null){
      const points: number | undefined = element.requirementImpactPoints.get(impact.id);
      if (points && 0 > points) {
        return true;
      }
    }
    return false;
  }

  clickFunction(element: Requirements, impact: Impact): void {
    if (element.requirementImpactPoints.get(impact.id) == null){
      element.requirementImpactPoints.set(impact.id, 1);
    } else if (element.requirementImpactPoints.get(impact.id) === 1){
      element.requirementImpactPoints.set(impact.id, -1);
    } else {
      element.requirementImpactPoints.delete(impact.id);
    }
  }
}
