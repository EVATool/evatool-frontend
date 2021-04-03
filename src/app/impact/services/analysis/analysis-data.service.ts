import {Router} from '@angular/router';
import {LogService} from '../../../shared/services/log.service';
import {AnalysisRestService} from './analysis-rest.service';
import {AnalysisMapperService} from './analysis-mapper.service';
import {Analysis} from '../../models/Analysis';
import {Injectable, Output, EventEmitter} from '@angular/core';

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
    private router: Router) {
  }

  onInit(): void {
    // Load current analysis.
    this.analysisRestService.urlIdExtracted.subscribe(id => {
      this.analysisRestService.getAnalysisById(id).subscribe(currentAnalysis => {
        this.currentAnalysis = this.analysisMapperService.fromDto(currentAnalysis);
        this.logger.info(this, 'Current analysis loaded (from router parameter)');
        this.loadedAnalyses.emit(this.currentAnalysis);
      });
    });

    this.analysisRestService.onInit();
  }

  getCurrentAnalysis(): Analysis {
    this.logger.debug(this, 'Get Current Analysis');
    return this.currentAnalysis;
  }
}
