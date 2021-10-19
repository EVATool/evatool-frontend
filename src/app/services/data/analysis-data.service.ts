import {Injectable, OnDestroy} from '@angular/core';
import {DataService} from './data.service';
import {LogService} from '../log.service';
import {Analysis} from '../../model/Analysis';
import {AnalysisRestService} from '../rest/analysis-rest.service';
import {AnalysisMapperService} from '../mapper/analysis-mapper.service';
import {AnalysisDto} from '../../dto/AnalysisDto';
import {ImportExportRestService} from '../rest/import-export-rest.service';
import {ReplaySubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnalysisDataService extends DataService implements OnDestroy {

  private ngUnsubscribe = new Subject();

  loadedAnalyses: Subject<Analysis[]> = new ReplaySubject();
  loadedCurrentAnalysis: Subject<Analysis> = new ReplaySubject();
  createdAnalysis: Subject<Analysis> = new ReplaySubject();
  updatedAnalysis: Subject<Analysis> = new ReplaySubject();
  deletedAnalysis: Subject<Analysis> = new ReplaySubject();
  exportedAnalysis: Subject<object> = new ReplaySubject();

  analyses: Analysis[] = [];
  currentAnalysis!: Analysis;

  constructor(protected logger: LogService,
              private analysisRest: AnalysisRestService,
              private analysisMapper: AnalysisMapperService,
              private importExportRest: ImportExportRestService) {
    super(logger);
  }

  init(): void {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loadAnalyses(): void {
    // Load all analyses.
    this.analysisRest.getAnalyses()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((analysisDtoList: AnalysisDto[]) => {
        const tempAnalyses: Analysis[] = [];
        analysisDtoList.forEach(analysisDto => {
          tempAnalyses.push(this.analysisMapper.fromDto(analysisDto));
        });
        this.analyses = this.sortDefault(tempAnalyses);
        this.loadedAnalyses.next(this.analyses);
        this.logger.debug(this, 'Analyses loaded');
      });
  }

  changeCurrentAnalysis(id: string): void {
    this.analysisRest.getAnalysisById(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((analysisDto: AnalysisDto) => {
        this.currentAnalysis = this.analysisMapper.fromDto(analysisDto);
        this.loadedCurrentAnalysis.next(this.currentAnalysis);
        this.logger.debug(this, 'Current analysis loaded');
      });
  }

  deepCopy(templateAnalysis: Analysis, analysis: Analysis): void {
    this.analysisRest.deepCopy(templateAnalysis.id, this.analysisMapper.toDto(analysis))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((analysisDto: AnalysisDto) => {
        const createdAnalysis = this.analysisMapper.fromDto(analysisDto);
        this.analyses.push(createdAnalysis);
        this.createdAnalysis.next(createdAnalysis);
        this.logger.debug(this, 'Analysis deep copied');
      });
  }

  createAnalysis(analysis: Analysis): void {
    this.analysisRest.createAnalysis(this.analysisMapper.toDto(analysis))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((analysisDto: AnalysisDto) => {
        const createdAnalysis = this.analysisMapper.fromDto(analysisDto);
        this.analyses.push(createdAnalysis);
        this.createdAnalysis.next(createdAnalysis);
        this.logger.debug(this, 'Analysis created');
      });
  }

  updateAnalysis(analysis: Analysis): void {
    this.analysisRest.updateAnalysis(this.analysisMapper.toDto(analysis))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((analysisDto: AnalysisDto) => {
        this.analysisMapper.updateFromDto(analysisDto, analysis);
        this.updatedAnalysis.next(analysis);
        this.logger.debug(this, 'Analysis updated');
      });
  }

  deleteAnalysis(analysis: Analysis): void {
    this.analysisRest.deleteAnalysis(analysis.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        const index: number = this.analyses.indexOf(analysis, 0);
        this.analyses.splice(index, 1);
        this.deletedAnalysis.next(analysis);
        this.logger.debug(this, 'Analysis deleted');
      });
  }

  createDefaultAnalysis(): Analysis {
    const analysis = new Analysis();

    analysis.name = '';
    analysis.description = '';
    analysis.isTemplate = false;

    return analysis;
  }

  importAnalyses(importAnalyses: string): void {
    this.importExportRest.importAnalyses(importAnalyses)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((importedAnalysisDtoList: AnalysisDto[]) => {
        for (const importedAnalysisDto of importedAnalysisDtoList) {
          const importedAnalysis = this.analysisMapper.fromDto(importedAnalysisDto);
          this.analyses.push(importedAnalysis);
        }
      });
  }

  exportAnalyses(analysisIds: string[], filename: string): void {
    this.importExportRest.exportAnalyses(analysisIds, filename)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((exportAnalyses: object) => {
        this.exportedAnalysis.next(exportAnalyses);
      });
  }
}
