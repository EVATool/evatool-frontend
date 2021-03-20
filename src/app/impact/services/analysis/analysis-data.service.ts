import { LogService } from '../../settings/log.service';
import { AnalysisRestService } from './analysis-rest.service';
import { DataLoader } from '../../settings/DataLoader';
import { AnalysisMapperService } from './analysis-mapper.service';
import { Analysis } from '../../models/Analysis';
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalysisDataService {
  @Output() loadedAnalyses: EventEmitter<Analysis[]> = new EventEmitter();

  analyses: Analysis[] = [];

  constructor(
    private logger: LogService,
    private analysisMapperService:AnalysisMapperService,
    private analysisRestService: AnalysisRestService) {

  }

  onInit(): void {
    if (DataLoader.useDummyData) {
      // Load dummy analyses.
      DataLoader.dummyAnalysisDtos.forEach(ana => {
        this.analyses.push(this.analysisMapperService.fromDto(ana));
      });
      this.logger.info('Analyses loaded.');
      this.loadedAnalyses.emit(this.analyses);
    } else {
      // Load analyses.
      this.analysisRestService.getAnalyses().subscribe(anas => {
        anas.forEach(ana => {
          this.analyses.push(this.analysisMapperService.fromDto(ana));
        });
        this.logger.info('Analyses loaded.');
        this.logger.info(this.analyses);
        this.loadedAnalyses.emit(this.analyses);
      });
    }
  }

  getCurrentAnalysis(): Analysis {
    // TODO Get current analysis from router url.
    return this.analyses[0];
  }
}
