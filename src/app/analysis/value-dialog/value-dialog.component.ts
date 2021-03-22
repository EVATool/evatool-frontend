import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-value-dialog',
  templateUrl: './value-dialog.component.html',
  styleUrls: ['./value-dialog.component.css']
})
export class ValueDialogComponent implements OnInit {

  public displayedColumns = ['id', 'title', 'description'];
  public matDataSourceEconomic = new MatTableDataSource();
  public matDataSourceSocial = new MatTableDataSource();

  constructor() { }

  ngOnInit(): void {
    this.matDataSourceSocial = new MatTableDataSource<any>([{id : "1", title: "TEST", description: "TEST"}])
  }

}
