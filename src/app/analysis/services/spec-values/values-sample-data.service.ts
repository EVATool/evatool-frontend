import { Injectable } from '@angular/core';
import {ValueDTO} from '../../model/ValueDTO';
import {AnalysisDTO} from '../../model/AnalysisDTO';
import {Value} from '../../model/Value';
import {Analysis} from '../../model/Analysis';

@Injectable({
  providedIn: 'root'
})
export class ValuesSampleDataService {

  constructor() { }
  defaultAnalysisDTO = new AnalysisDTO();
  defaultAnalysis = new Analysis();

  dummyValueDTOs: ValueDTO[] = [
    {
      id: '1',
      name: 'name1',
      description: 'description1',
      type: 'type1',
      archived: false,
      analysis: this.defaultAnalysisDTO
    },
    {
      id: '2',
      name: 'name2',
      description: 'description2',
      type: 'type2',
      archived: false,
      analysis: this.defaultAnalysisDTO
    },
    {
      id: '3',
      name: 'name3',
      description: 'description3',
      type: 'type3',
      archived: false,
      analysis: this.defaultAnalysisDTO
    },
  ];

  readonly dummyValues: Value[] = [
    {
      id: '1',
      name: 'name1',
      description: 'description1',
      type: 'type1',
      editable: false,
      archived: false,
      analysis: this.defaultAnalysis
    },
    {
      id: '2',
      name: 'name2',
      description: 'description2',
      type: 'type2',
      editable: false,
      archived: false,
      analysis: this.defaultAnalysis
    },
    {
      id: '3',
      name: 'name3',
      description: 'description3',
      type: 'type3',
      editable: false,
      archived: false,
      analysis: this.defaultAnalysis
    },
  ];

  public valueDummyDTOS = this.dummyValueDTOs;

  getDummyValuesDTOs(): ValueDTO[] {
    return this.valueDummyDTOS;
  }

  getDummyValueDTO(): ValueDTO {
    return this.valueDummyDTOS[0];
  }

  getDummyValue(): Value {
    return this.dummyValues[0];
  }

  setup(): void {
    this.valueDummyDTOS = this.dummyValueDTOs;
  }

  delete(): void {
    this.valueDummyDTOS.pop();
  }
}
