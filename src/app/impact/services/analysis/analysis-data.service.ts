import { AnalysisDto } from './../../dtos/AnalysisDto';
import { AnalysisMapperService } from './analysis-mapper.service';
import { Analysis } from './../../models/Analysis';
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalysisDataService {
  @Output() stakeholdersLoaded: EventEmitter<Analysis[]> = new EventEmitter();

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
    // Load dummy stakeholders.
    this.dummyAnalysisDtos.forEach(ana => {
      this.analyses.push(AnalysisMapperService.fromDto(ana));
    });
    this.stakeholdersLoaded.emit(this.analyses);
  }

  onInit() {

  }
}
