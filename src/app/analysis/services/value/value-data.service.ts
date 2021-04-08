import { EventEmitter, Injectable } from '@angular/core';
import { Value } from "../../model/Value";
import { ValueRestService } from "./value-rest.service";
import { MatTableDataSource } from "@angular/material/table";
import { Stakeholder } from "../../../stakeholder/model/Stakeholder";
import {Analysis} from '../../model/Analysis';
import {AnalysisDTO} from '../../model/AnalysisDTO';
import {AnalysisRestService} from '../analysis/analysis-rest.service';

@Injectable({
  providedIn: 'root'
})
export class ValueDataService {
  socialValue: Value[] = [];
  economicValue: Value[] = [];

  matDataSourceEconomic = new MatTableDataSource<Value>();
  matDataSourceSocial = new MatTableDataSource<Value>();

  constructor(private valueRestService: ValueRestService, private analysisRestService: AnalysisRestService) {
    this.matDataSourceEconomic = new MatTableDataSource<Value>(this.socialValue);
    this.matDataSourceSocial = new MatTableDataSource<Value>(this.economicValue);
  }

  onInit() {
    //this.loadValuesByAnalysisId();
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
    this.valueRestService.deleteValue(value)/*.subscribe(() => { this.loadValues(); })*/;
  }

  archiveValue(value: Value): void {
    console.log(value);
    this.analysisRestService.getAnalysisById(value.analysis.rootEntityID).subscribe((result: any) => {
      console.log(result);
      console.log(value);
      this.valueRestService.updateValue({
        id: value.id,
        name: value.name,
        type: value.type,
        description: value.description,
        archived: true,
        analysis: result
      }).subscribe(() => {
        this.loadValuesByAnalysisId(value.analysis.rootEntityID);
      });
    });
  }

  save(value: Value, id: string): void {
    this.analysisRestService.getAnalysisById(id).subscribe((result: any) => {
      console.log(result);
      this.valueRestService.createValue({
        id: '',
        name: value.name,
        description: value.description,
        type: value.type,
        // analysis: analysis1
        analysis: result
      }).subscribe(() => {
        this.loadValuesByAnalysisId(id);
      });
    });
  }

  loadValues(id: string): void {
    console.log(id);
    this.valueRestService.getValueById(id).subscribe((result: any) => {
      this.socialValue = [];
      this.economicValue = [];
      result.forEach((valueDTO: any) => {
        if (valueDTO.type === 'SOCIAL') {
          const value: Value = {
            id: valueDTO.id,
            name: valueDTO.name,
            description: valueDTO.description,
            type: valueDTO.type,
            analysis: valueDTO.analysis
          };
          this.socialValue.push(value);
        }
        else if (valueDTO.type === 'ECONOMIC') {
          const value: Value = {
            id: valueDTO.id,
            name: valueDTO.name,
            description: valueDTO.description,
            type: valueDTO.type,
            analysis: valueDTO.analysis
          };
          this.economicValue.push(value);
        }
      });
      this.matDataSourceEconomic = new MatTableDataSource<Value>(this.economicValue);
      this.matDataSourceSocial = new MatTableDataSource<Value>(this.socialValue);
      console.log(this.matDataSourceEconomic);
    });
  }

  loadValuesByAnalysisId(id: string): void {
    console.log(id);
    this.valueRestService.getValuesByAnalysisId(id).subscribe((result: any) => {
      this.socialValue = [];
      this.economicValue = [];
      result.forEach((valueDTO: any) => {
        if (valueDTO.type === 'SOCIAL') {
          const value: Value = {
            id: valueDTO.id,
            name: valueDTO.name,
            description: valueDTO.description,
            type: valueDTO.type,
            analysis: valueDTO.analysis
          };
          this.socialValue.push(value);
        }
        else if (valueDTO.type === 'ECONOMIC') {
          const value: Value = {
            id: valueDTO.id,
            name: valueDTO.name,
            description: valueDTO.description,
            type: valueDTO.type,
            analysis: valueDTO.analysis
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
