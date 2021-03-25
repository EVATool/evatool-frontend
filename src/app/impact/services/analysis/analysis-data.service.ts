import { Router } from '@angular/router';
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
  @Output() loadedAnalyses: EventEmitter<Analysis> = new EventEmitter();

  currentAnalysis!: Analysis;

  constructor(
    private logger: LogService,
    private analysisMapperService: AnalysisMapperService,
    private analysisRestService: AnalysisRestService,
    private router: Router) { }

  onInit(): void {
    if (DataLoader.useDummyData) {
      // Load dummy analyses.
      this.currentAnalysis = this.analysisMapperService.fromDto(DataLoader.dummyAnalysisDtos[0]);
      this.logger.info(this, 'Analyses loaded');
      this.loadedAnalyses.emit(this.currentAnalysis);
    } else {
      // Load current analysis.
      this.router.routerState.root.queryParams.subscribe(params => {
        this.analysisRestService.getAnalysisById(params.id).subscribe(currentAnalysis => {
          this.currentAnalysis = this.analysisMapperService.fromDto(currentAnalysis);
          this.logger.info(this, 'Analysis loaded (from router parameter)');
          this.loadedAnalyses.emit(this.currentAnalysis);
        });
      });
    }
  }

  getCurrentAnalysis(): Analysis {
    this.logger.debug(this, 'Get Current Analysis');
    return this.currentAnalysis;
  }
}
