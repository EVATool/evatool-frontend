import {HttpClientModule} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';

import {AnalysisDataService} from './analysis-data.service';
import {AnalysisSampleDataService} from '../spec-analysis/analysis-sample-data.service';
import {RestMockProvidersAnalysis} from '../spec-analysis/RestMockProvidersAnalysis';

describe('AnalysisDataService', () => {
  let service: AnalysisDataService;
  let dataService: AnalysisSampleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: RestMockProvidersAnalysis.imports,
      providers: RestMockProvidersAnalysis.providers
    });
    service = TestBed.inject(AnalysisDataService);
    dataService = TestBed.inject(AnalysisSampleDataService);
    dataService.setup();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('load Analyses', () => {
    service.loadAllAnalysis();
    expect(service.analysisArray.length).toBeGreaterThanOrEqual(3);
  });

  it('load Analysis by ID', () => {
    service.loadAnalysis('');
    expect(service.getCurrentAnalysis().rootEntityID === '1');
  });

  it('create Analysis', () => {
    service.save(dataService.getDummyAnalysis());
  });

  it('update Analysis', () => {
    service.update(dataService.getDummyAnalysis());
    expect(service.analysisArray[0].rootEntityID === '1');
  });

  it('delete Analysis', () => {
    const oldSize = service.analysisArray.length;
    service.deleteAnalysis(dataService.getDummyAnalysis());
    expect(oldSize).toBeLessThan(service.analysisArray.length);
  });
});
