import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ImpactDataService } from './impact-data.service';
import { SampleDataService } from '../../spec/sample-data.service';
import { ImpactRestService } from './impact-rest.service';
import { StakeholderRestService } from '../stakeholder/stakeholder-rest.service';
import { AnalysisRestService } from '../analysis/analysis-rest.service';
import { DimensionRestService } from '../dimension/dimension-rest.service';

describe('ImpactDataService', () => {
  let sampleData: SampleDataService;
  let stakeholderRestService: StakeholderRestService;
  let analysisRestService: AnalysisRestService;
  let dimensionRestService: DimensionRestService;
  let restService: ImpactRestService;
  let service: ImpactDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule]
    });
    sampleData = TestBed.inject(SampleDataService);
    stakeholderRestService = TestBed.inject(StakeholderRestService);
    analysisRestService = TestBed.inject(AnalysisRestService);
    dimensionRestService = TestBed.inject(DimensionRestService);
    restService = TestBed.inject(ImpactRestService);
    service = TestBed.inject(ImpactDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#onInit', () => {
    it('should load impacts', () => {
      // Arrange
      spyOn(stakeholderRestService, 'getStakeholders').and.returnValue(sampleData.getObservable(sampleData.dummyStakeholderDtos));
      spyOn(analysisRestService, 'getAnalysisById').and.returnValue(sampleData.getObservable(sampleData.dummyAnalysisDtos[0]));
      spyOn(dimensionRestService, 'getDimensions').and.returnValue(sampleData.getObservable(sampleData.dummyDimensionDtos));
      spyOn(restService, 'getImpactsByAnalysisId').and.returnValue(sampleData.getObservable(sampleData.dummyImpactDtos));

      // Act
      service.onInit();

      // Assert
      expect(service.impacts.length).toEqual(sampleData.dummyImpactDtos.length);
    });

    it('should fire \'loadedImpacts\' event', () => {
      // Arrange
      spyOn(service.loadedImpacts, 'emit');
      spyOn(stakeholderRestService, 'getStakeholders').and.returnValue(sampleData.getObservable(sampleData.dummyStakeholderDtos));
      spyOn(analysisRestService, 'getAnalysisById').and.returnValue(sampleData.getObservable(sampleData.dummyAnalysisDtos[0]));
      spyOn(dimensionRestService, 'getDimensions').and.returnValue(sampleData.getObservable(sampleData.dummyDimensionDtos));
      spyOn(restService, 'getImpactsByAnalysisId').and.returnValue(sampleData.getObservable(sampleData.dummyImpactDtos));

      // Act
      service.onInit();

      // Assert
      expect(service.loadedImpacts.emit).toHaveBeenCalled();
    });
  });

  describe('#createImpact', () => {
    it('should create a new Impact', () => {
      // Arrange

      // Act

      // Assert

    });
  });

  describe('#updateImpact', () => {
    it('should update an Impact', () => {
      // Arrange

      // Act

      // Assert

    });
  });

  describe('#deleteImpact', () => {
    it('should delete an Impact', () => {
      // Arrange

      // Act

      // Assert

    });
  });
});
