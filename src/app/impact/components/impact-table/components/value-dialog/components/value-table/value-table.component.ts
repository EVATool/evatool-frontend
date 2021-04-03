import { ValueDataService } from '../../../../../../services/value/value-data.service';
import { Value } from '../../../../../../models/Value';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-value-table',
  templateUrl: './value-table.component.html',
  styleUrls: ['./value-table.component.scss', '../../../../../../../layout/style/style.css']
})
export class ValueTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @Input() type!: string;

  tableDataSource: MatTableDataSource<Value> = new MatTableDataSource<Value>();
  displayedColumns = ['include', 'name', 'description'];

  constructor(private valueDataService: ValueDataService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    const values: Value[] = this.valueDataService.values.filter(dim => dim.type === this.type);
    this.tableDataSource = new MatTableDataSource<Value>(values);
    this.initSorting();
  }

  private initSorting(): void {
    this.tableDataSource.sort = this.sort;
    this.tableDataSource.sortingDataAccessor = (impact, property) => {
      switch (property) {
        case 'stakeholder': return impact.stakeholder.name;
        case 'valueEntity': return impact.value.name;
        default: return impact[property];
      }
    };
  }
}
