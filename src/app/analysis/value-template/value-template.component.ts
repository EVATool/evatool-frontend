import {Component, OnInit, AfterViewInit, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ValueDataService } from '../services/value/value-data.service';
import { Value } from '../model/Value';
import {Analysis} from '../model/Analysis';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-value-template',
  templateUrl: './value-template.component.html',
  styleUrls: ['./value-template.component.css']
})
export class ValueTemplateComponent implements OnInit, AfterViewInit {
  @Input() template: Analysis = new Analysis();

  public displayedColumns = ['name', 'description'];

  public matDataSourceEconomic = new MatTableDataSource<Value>();
  public matDataSourceSocial = new MatTableDataSource<Value>();


  socialValue: Value[] = [];
  economicValue: Value[] = [];

  constructor(public valueDataService: ValueDataService, @Inject(MAT_DIALOG_DATA) public data: { id: string }) {
    valueDataService.loadValuesByAnalysisId(this.data.id);
  }

  ngOnInit(): void {
    // this.matDataSourceEconomic.data = this.template.
    /*this.valueDataService.onCreateSocialValue.subscribe(value => {
      this.socialValue.push(value);
      this.matDataSourceSocial = new MatTableDataSource<Value>(this.socialValue);
    });

    this.valueDataService.onCreateEconomicValue.subscribe(value => {
      this.economicValue.push(value);
      this.matDataSourceEconomic = new MatTableDataSource<Value>(this.economicValue);
    });*/
  }

  ngAfterViewInit(): void {
    // this.valueDataService.onInit();
  }

  addSocialValue(): void {
    // this.valueDataService.createSocialValue();
  }

  addEconomicValue(): void {
    // this.valueDataService.createEconomicValue();
  }

  saveSocialValue(value: Value): void {
    // value.editable = false;
    // this.valueDataService.save(value, this.data.id);
  }

  saveEconomicValue(value: Value): void {
    // value.editable = false;
    // this.valueDataService.save(value, this.data.id);
  }

  deleteValue(value: Value): void {
    // this.valueDataService.deleteValue(value);
  }

  archiveValue(value: Value): void {
    // value.archived = !value.archived;
    // this.valueDataService.archiveValue(value);
  }
}
