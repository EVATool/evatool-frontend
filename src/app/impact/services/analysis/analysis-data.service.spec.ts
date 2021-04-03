import {SampleDataService} from '../../spec/sample-data.service';
import {Router} from '@angular/router';
import {TestBed} from '@angular/core/testing';

import {AnalysisDataService} from './analysis-data.service';
import {RestMockProviders} from "../../spec/RestMockProviders";

describe('AnalysisDataService', () => {
  let sampleData: SampleDataService;
  let router: Router;
  let service: AnalysisDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: RestMockProviders.imports,
      providers: RestMockProviders.providers
    });

    sampleData = TestBed.inject(SampleDataService);
    router = TestBed.inject(Router);
    service = TestBed.inject(AnalysisDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#onInit', () => {
    it('should fire \'loadedAnalyses\' event', () => {
      // Arrange
      spyOn(service.loadedAnalyses, 'emit');

      // Act
      service.onInit();

      // Assert
      expect(service.loadedAnalyses.emit).toHaveBeenCalled();
    });

    it('should load current analysis', () => {
      // Arrange

      // Act
      service.onInit();

      // Assert
      expect(service.currentAnalysis).toBeTruthy();
    });

    it('should extract analysisId from router URL', () => {
      // TODO set url and get router.routerState.root.queryParams to fire correctly...
    });
  });
});
