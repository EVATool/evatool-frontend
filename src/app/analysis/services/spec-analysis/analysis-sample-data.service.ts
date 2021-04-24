import { Injectable } from '@angular/core';
import {AnalysisDTO} from '../../model/AnalysisDTO';
import {Analysis} from '../../model/Analysis';

@Injectable({
  providedIn: 'root'
})
export class AnalysisSampleDataService {

  constructor() { }

  dummyAnalysisDTOs: AnalysisDTO[] = [
    {
      rootEntityID: '1',
      isTemplate: false,
      uniqueString: 'Ana1',
      analysisName: 'Name1',
      analysisDescription: 'Description1',
      image: 'image1',
      date: 'date1',
      lastUpdate: 'lastUpdate1'
    },
    {
      rootEntityID: '2',
      isTemplate: false,
      uniqueString: 'Ana2',
      analysisName: 'Name2',
      analysisDescription: 'Description2',
      image: 'image2',
      date: 'date2',
      lastUpdate: 'lastUpdate2'
    },
    {
      rootEntityID: '3',
      isTemplate: false,
      uniqueString: 'Ana3',
      analysisName: 'Name3',
      analysisDescription: 'Description3',
      image: 'image3',
      date: 'date3',
      lastUpdate: 'lastUpdate3'
    },
  ];

  readonly dummyAnalyses: Analysis[] = [
    {
      rootEntityID: '1',
      analysisName: 'Name1',
      analysisDescription: 'Description1',
      isTemplate: false,
      uniqueString: 'Ana1',
      date: 'date1',
      lastUpdate: 'lastUpdate1',
      TitleIsEditable: false,
      DescriptionIsEditable: false,
      editImage: false,
      image: 'image1'
    },
    {
      rootEntityID: '2',
      analysisName: 'Name2',
      analysisDescription: 'Description2',
      isTemplate: false,
      uniqueString: 'Ana2',
      date: 'date2',
      lastUpdate: 'lastUpdate2',
      TitleIsEditable: false,
      DescriptionIsEditable: false,
      editImage: false,
      image: 'image2'
    },
    {
      rootEntityID: '3',
      analysisName: 'Name3',
      analysisDescription: 'Description3',
      isTemplate: false,
      uniqueString: 'Ana3',
      date: 'date3',
      lastUpdate: 'lastUpdate3',
      TitleIsEditable: false,
      DescriptionIsEditable: false,
      editImage: false,
      image: 'image3'
    },
  ];

  public analysisDummyDTOS = this.dummyAnalysisDTOs;

  getDummyAnalysesDTOs(): AnalysisDTO[] {
    return this.analysisDummyDTOS;
  }

  getDummyAnalysisDTO(): AnalysisDTO {
    return this.analysisDummyDTOS[0];
  }

  getDummyAnalysis(): Analysis {
    return this.dummyAnalyses[0];
  }

  setup(): void {
    this.analysisDummyDTOS = this.dummyAnalysisDTOs;
  }

  delete(): void {
    this.analysisDummyDTOS.pop();
  }
}
