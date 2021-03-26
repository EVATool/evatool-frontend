import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DimensionDataService } from '../../../../services/dimension/dimension-data.service';
import { Dimension } from '../../../../models/Dimension';
import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dimension-table',
  templateUrl: './dimension-table.component.html',
  styleUrls: ['./dimension-table.component.scss', '../../../../../layout/style/style.css']
})
export class DimensionTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @Input() type!: string;

  tableDataSource: MatTableDataSource<Dimension> = new MatTableDataSource<Dimension>();
  displayedColumns = ['name', 'description'];

  constructor(private dimensionDataService: DimensionDataService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    const dimensions: Dimension[] = this.dimensionDataService.dimensions.filter(dim => dim.type === this.type);
    this.tableDataSource = new MatTableDataSource<Dimension>(dimensions);
    this.initSorting();
  }

  private initSorting(): void {
    this.tableDataSource.sort = this.sort;
    this.tableDataSource.sortingDataAccessor = (impact, property) => {
      switch (property) {
        case 'stakeholder': return impact.stakeholder.name;
        case 'dimension': return impact.dimension.name;
        default: return impact[property];
      }
    };
  }
}
