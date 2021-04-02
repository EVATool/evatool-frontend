import {RouterTestingModule} from '@angular/router/testing';
import {TestBed} from '@angular/core/testing';

import {ImpactDataService} from './impact-data.service';
import {SampleDataService} from '../../spec/sample-data.service';
import {ImpactRestService} from './impact-rest.service';
import {StakeholderRestService} from '../stakeholder/stakeholder-rest.service';
import {AnalysisRestService} from '../analysis/analysis-rest.service';
import {DimensionRestService} from '../dimension/dimension-rest.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MockedValueRestService} from "../dimension/dimension-rest.service.spec";
import {MockedImpactRestService} from "./impact-rest.service.spec";
import {MockedAnalysisRestService} from "../analysis/analysis-rest.service.spec";
import {MockedStakeholderRestService} from "../stakeholder/stakeholder-rest.service.spec";

describe('ImpactDataService', () => {
  let sampleData: SampleDataService;
  let stakeholderRestService: StakeholderRestService;
  let analysisRestService: AnalysisRestService;
  let dimensionRestService: DimensionRestService;
  let restService: ImpactRestService;
  let service: ImpactDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: DimensionRestService,
          useClass: MockedValueRestService
        },
        {
          provide: StakeholderRestService,
          useClass: MockedStakeholderRestService
        },
        {
          provide: AnalysisRestService,
          useClass: MockedAnalysisRestService
        },
        {
          provide: ImpactRestService,
          useClass: MockedImpactRestService
        }
      ]
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
    it('should fire \'loadedImpacts\' event', () => {
      // Arrange
      spyOn(service.loadedImpacts, 'emit');

      // Act
      service.onInit();

      // Assert
      expect(service.loadedImpacts.emit).toHaveBeenCalled();
    });

    it('should load impacts', () => {
      // Arrange

      // Act
      service.onInit();

      // Assert
      expect(service.impacts).toEqual(sampleData.dummyImpacts);
    });
  });

  describe('#createImpact', () => {
    it('should create a new Impact', () => {
      // Arrange
      service.onInit();

      // Act
      const existingImpacts = service.impacts.length;
      service.createImpact();

      // Assert
      expect(service.impacts.length).toBe(existingImpacts + 1);
    });
  });

  describe('#updateImpact', () => {
    it('should update an Impact', () => {
      // Arrange
      service.onInit();

      // Act
      const updateImpact = service.impacts[0];
      updateImpact.description = "New Description";
      service.updateImpact(updateImpact);

      // Assert
      expect(service.impacts).toContain(updateImpact);
    });
  });

  describe('#deleteImpact', () => {
    it('should delete an Impact', () => {
      // Arrange
      service.onInit();

      // Act
      const existingImpacts = service.impacts.length;
      const deleteImpact = service.impacts[0];
      service.deleteImpact(deleteImpact);

      // Assert
      expect(service.impacts.length).toBe(existingImpacts - 1);
    });
  });
});
