
import { Injectable, Output, EventEmitter } from '@angular/core';
import {Analysis} from "../../model/Analysis";

@Injectable({
  providedIn: 'root'
})
export class AnalysisDataService {
  @Output() onCreateAnalysis: EventEmitter<Analysis> = new EventEmitter();

  dummyAnalysis: Analysis[] = [
    {
      id: '1',
      title: 'Titel 1',
      description: 'Eine Beschreibung'
    },
    {
      id: '2',
      title: 'Titel 2',
      description: 'Eine Beschreibung'
    },
    {
      id: '3',
      title: 'Titel 3',
      description: 'Eine Beschreibung'
    },
    {
      id: '4',
      title: 'Titel 4',
      description: 'This is the fourth read-only impact',
    }
  ];

  analysisList: Analysis[] = this.dummyAnalysis;

  constructor(private analysisDataService: AnalysisDataService) {
  }

  getAnalysis(): Analysis[] {
    return this.analysisList;
  }

  private createDefaultAnalysis(): Analysis {
    let analysis = new Analysis();

    analysis.id = 'TEST';
    analysis.title = 'Analysis_1';
    analysis.description = 'TEST_AM';
    return analysis;
  }

  createAnalysis(): Analysis {
    let analysis = this.createDefaultAnalysis();
    this.analysisList.push(analysis);
    this.onCreateAnalysis.emit(analysis);
    return analysis;
  }
}
