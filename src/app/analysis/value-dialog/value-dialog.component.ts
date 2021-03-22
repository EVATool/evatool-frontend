import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {ValueDataService} from "../services/value/value-data.service";
import {Value} from "../model/Value";

@Component({
  selector: 'app-value-dialog',
  templateUrl: './value-dialog.component.html',
  styleUrls: ['./value-dialog.component.css']
})
export class ValueDialogComponent implements OnInit {

  public displayedColumns = ['id', 'title', 'description'];
  public matDataSourceEconomic: MatTableDataSource<Value> = new MatTableDataSource();
  public matDataSourceSocial: MatTableDataSource<{ description: string; id: string; title: string }> = new MatTableDataSource();

  socialValue: Value[] = [];
  economicValue: Value[] = [];

  constructor(private valueDataService: ValueDataService) { }

  ngOnInit(): void {
    this.matDataSourceSocial = new MatTableDataSource<Value>([{id : "1", title: "TEST", description: "TEST"},
      {id: "2", title: "TEST2", description: "TEST2"},
      {id: "3", title: "TEST3", description: "TEST3"}])

    this.matDataSourceEconomic = new MatTableDataSource<Value>([{id : "1", title: "TEST", description: "TEST"},
      {id: "2", title: "TEST2", description: "TEST2"},
      {id: "3", title: "TEST3", description: "TEST3"}])

    this.valueDataService.onCreateValue.subscribe(value => {
      this.socialValue.push(value);
      this.matDataSourceSocial = new MatTableDataSource<Value>(this.socialValue);

      this.economicValue.push(value);
      this.matDataSourceEconomic = new MatTableDataSource<Value>(this.economicValue);
    });
  }

  addSocialValue(): void {
    this.valueDataService.createSocialValue();
  }

  addEconomicValue(): void {
    this.valueDataService.createEconomicValue();
  }

}
