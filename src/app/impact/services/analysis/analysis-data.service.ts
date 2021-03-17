import { AnalysisDto } from './../../dtos/AnalysisDto';
import { AnalysisMapperService } from './analysis-mapper.service';
import { Analysis } from './../../models/Analysis';
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalysisDataService {
  @Output() loadedAnalyses: EventEmitter<Analysis[]> = new EventEmitter();

  dummyAnalysisDtos: AnalysisDto[] = [
    {
      id: '1'
    },
    {
      id: '2'
    },
    {
      id: '3'
    },
    {
      id: '4'
    }
  ];

  analyses: Analysis[] = [];

  constructor() {

  }

  onInit() {
    // Load dummy stakeholders.
    this.dummyAnalysisDtos.forEach(ana => {
      this.analyses.push(AnalysisMapperService.fromDto(ana));
    });
    console.log('Analyses loaded.');
    this.loadedAnalyses.emit(this.analyses);
  }

  invalidate() {
    if (this.analyses.length > 0) {
      this.loadedAnalyses.emit(this.analyses);
    }
  }
}
