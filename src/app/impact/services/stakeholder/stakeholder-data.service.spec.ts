import {SampleDataService} from '../../spec/sample-data.service';
import {TestBed} from '@angular/core/testing';

import {StakeholderDataService} from './stakeholder-data.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {StakeholderRestService} from "./stakeholder-rest.service";
import {MockedStakeholderRestService} from "./stakeholder-rest.service.spec";

describe('StakeholderDataService', () => {
  let sampleData: SampleDataService;
  let service: StakeholderDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: StakeholderRestService,
          useClass: MockedStakeholderRestService
        }]
    });

    sampleData = TestBed.inject(SampleDataService);
    service = TestBed.inject(StakeholderDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#onInit', () => {
    it('should fire \'loadedStakeholders\' event', () => {
      // Arrange
      spyOn(service.loadedStakeholders, 'emit');

      // Act
      service.onInit();

      // Assert
      expect(service.loadedStakeholders.emit).toHaveBeenCalled();
    });

    it('should load stakeholders', () => {
      // Arrange

      // Act
      service.onInit();

      // Assert
      expect(service.stakeholders).toEqual(sampleData.dummyStakeholders);
    });
  })
});
