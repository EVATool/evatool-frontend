
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {Datagenerator} from '../../services/datagenerator';
import {Requirements} from '../../models/Requirements';
import {Dimension} from '../../models/Dimension';
import {Impact} from '../../models/Impact';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-requirement-table',
  templateUrl: './requirements-table.component.html',
  styleUrls: ['./requirements-table.component.css', '../../../layout/style/style.css']
})
export class RequirementsTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[];
  displayedColumnsImpacts: string[] = ['ID'];
  dataSource = ELEMENT_DATA;
  requirementsSource: Requirements[];
  impactSoureces: Impact[];
  constructor(datagenerator: Datagenerator) {
    this.requirementsSource = datagenerator.getRequirements();
    this.impactSoureces = datagenerator.getImpacts();
    let impactIdList: string[] = [];
    this.impactSoureces.forEach(value => impactIdList = impactIdList.concat(value.id));
    this.displayedColumns = ['ID', 'Requirements', 'Variants', 'Dimension'];
    this.displayedColumns = this.displayedColumns.concat(impactIdList);
  }

  ngOnInit(): void {
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
}
