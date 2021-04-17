import {SampleDataService} from '../../spec/sample-data.service';
import {TestBed} from '@angular/core/testing';

import {StakeholderDataService} from './stakeholder-data.service';
import {RestMock} from '../../spec/RestMock';

describe('StakeholderDataService', () => {
  let data: SampleDataService;
  let service: StakeholderDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: RestMock.imports,
      providers: RestMock.providers
    });

    data = TestBed.inject(SampleDataService);
    service = TestBed.inject(StakeholderDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

 /* describe('#onInit', () => {
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
      expect(service.stakeholders).toEqual(data.dummyStakeholders);
    });
  });*/
});
