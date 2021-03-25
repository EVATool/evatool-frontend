import { SampleDataService } from './../../spec/sample-data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AnalysisDataService } from './analysis-data.service';
import { AnalysisRestService } from './analysis-rest.service';

describe('AnalysisDataService', () => {
  let sampleData: SampleDataService;
  let router: Router;
  let restService: AnalysisRestService;
  let service: AnalysisDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule]
    });
    sampleData = TestBed.inject(SampleDataService);
    router = TestBed.inject(Router);
    restService = TestBed.inject(AnalysisRestService);
    service = TestBed.inject(AnalysisDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#onInit', () => {
    it('should extract analysisId from router URL', () => {
      // TODO set url and get router.routerState.root.queryParams to fire correctly...      
    });

    it('should load current analysis', () => {
      // Arrange
      spyOn(restService, 'getAnalysisById').and.returnValue(sampleData.getObservable(sampleData.dummyAnalysisDtos[0]));

      // Act
      service.onInit();

      // Assert
      expect(service.currentAnalysis).toBeTruthy();
    });

    it('should fire \'urlIdExtracted\' event', () => {
      // Arrange
      spyOn(service.urlIdExtracted, 'emit');
      spyOn(restService, 'getAnalysisById').and.returnValue(sampleData.getObservable(sampleData.dummyAnalysisDtos[0]));

      // Act
      service.onInit();

      // Assert
      expect(service.urlIdExtracted.emit).toHaveBeenCalled();
    });

    it('should fire \'loadedAnalyses\' event', () => {
      // Arrange
      spyOn(service.loadedAnalyses, 'emit');
      spyOn(restService, 'getAnalysisById').and.returnValue(sampleData.getObservable(sampleData.dummyAnalysisDtos[0]));

      // Act
      service.onInit();

      // Assert
      expect(service.loadedAnalyses.emit).toHaveBeenCalled();
    });
  });
});
