import { SampleDataService } from '../../spec/sample-data.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { StakeholderDataService } from './stakeholder-data.service';
import { StakeholderRestService } from './stakeholder-rest.service';

describe('StakeholderDataService', () => {
  let sampleData: SampleDataService;
  let restService: StakeholderRestService;
  let service: StakeholderDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    sampleData = TestBed.inject(SampleDataService);
    restService = TestBed.inject(StakeholderRestService);
    service = TestBed.inject(StakeholderDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#onInit', () => {
    it('should load stakeholders', () => {
      // Arrange
      spyOn(restService, 'getStakeholders').and.returnValue(sampleData.getObservable(sampleData.dummyStakeholderDtos));

      // Act
      service.onInit();

      // Assert
      expect(service.stakeholders.length).toEqual(sampleData.dummyStakeholderDtos.length);
    });


    it('should fire \'loadedStakeholders\' event', () => {
      // Arrange
      spyOn(service.loadedStakeholders, 'emit');
      spyOn(restService, 'getStakeholders').and.returnValue(sampleData.getObservable(sampleData.dummyStakeholderDtos));

      // Act
      service.onInit();

      // Assert
      expect(service.loadedStakeholders.emit).toHaveBeenCalled();
    });
  })
});
