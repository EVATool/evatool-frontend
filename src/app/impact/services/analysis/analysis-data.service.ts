import { AnalysisRestService } from './analysis-rest.service';
import { DataLoader } from '../../settings/DataLoader';
import { AnalysisDto } from './../../dtos/AnalysisDto';
import { AnalysisMapperService } from './analysis-mapper.service';
import { Analysis } from './../../models/Analysis';
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalysisDataService {
  @Output() loadedAnalyses: EventEmitter<Analysis[]> = new EventEmitter();

  analyses: Analysis[] = [];

  constructor(private analysisRestService: AnalysisRestService) {

  }

  onInit() {
    if (DataLoader.useDummyData) {
      // Load dummy analyses.
      DataLoader.dummyAnalysisDtos.forEach(ana => {
        this.analyses.push(AnalysisMapperService.fromDto(ana));
      });
      console.log('Analyses loaded.');
      this.loadedAnalyses.emit(this.analyses);
    } else {
      // Load analyses.
      this.analysisRestService.getAnalyses().subscribe(anas => {
        anas.forEach(ana => {
          this.analyses.push(AnalysisMapperService.fromDto(ana));
        });
        console.log('Analyses loaded.');
        console.log(this.analyses);
        this.loadedAnalyses.emit(this.analyses);
      });
    }
  }
}
