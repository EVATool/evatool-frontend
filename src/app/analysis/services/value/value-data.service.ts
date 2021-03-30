import {EventEmitter, Injectable} from '@angular/core';
import {Value} from "../../model/Value";
import {ValueRestService} from "./value-rest.service";
import {MatTableDataSource} from "@angular/material/table";
import {Stakeholder} from "../../../stakeholder/model/Stakeholder";

@Injectable({
  providedIn: 'root'
})
export class ValueDataService {
  socialValue: Value[] = [];
  economicValue: Value[] = [];

  matDataSourceEconomic = new MatTableDataSource<Value>();
  matDataSourceSocial = new MatTableDataSource<Value>();

  constructor(private valueRestService: ValueRestService) {
    this.matDataSourceEconomic = new MatTableDataSource<Value>(this.socialValue);
    this.matDataSourceSocial = new MatTableDataSource<Value>(this.economicValue);
    this.loadValues();
  }

  private createDefaultValue(): Value {
    const value = new Value();
    value.editable = true;
    return value;
  }

  createSocialValue(): void {
    const value = this.createDefaultValue();
    value.type = 'SOCIAL';
    this.socialValue.push(value);
    this.matDataSourceSocial = new MatTableDataSource<Value>(this.socialValue);
  }

  createEconomicValue(): void {
    const value = this.createDefaultValue();
    value.type = 'ECONOMIC';
    this.economicValue.push(value);
    this.matDataSourceEconomic = new MatTableDataSource<Value>(this.economicValue);
  }

  deleteValue(value: Value): void {
    this.valueRestService.deleteValue(value).subscribe(() => {this.loadValues(); });
  }

  save(value: Value): void {
    this.valueRestService.createValue({
      id: '',
      guiId: '',
      name: value.name,
      description: value.description,
      type: value.type
    }).subscribe(() => {
      this.loadValues();
    });
  }

  loadValues(): void {
    this.valueRestService.getValues().subscribe((result: any) => {
      this.socialValue = [];
      this.economicValue = [];
      result.forEach((valueDTO: any) => {
        if (valueDTO.type === 'SOCIAL') {
          const value: Value = {
            id: valueDTO.id,
            name: valueDTO.name,
            description: valueDTO.description,
            type: valueDTO.type,
            guiId: valueDTO.guiId
          };
          this.socialValue.push(value);
        }
        else if (valueDTO.type === 'ECONOMIC'){
          const value: Value = {
            id: valueDTO.id,
            name: valueDTO.name,
            description: valueDTO.description,
            type: valueDTO.type,
            guiId: valueDTO.guiId
          };
          this.economicValue.push(value);
        }
      });
      this.matDataSourceEconomic = new MatTableDataSource<Value>(this.economicValue);
      this.matDataSourceSocial = new MatTableDataSource<Value>(this.socialValue);
      console.log(this.matDataSourceEconomic);
    });
  }
}
