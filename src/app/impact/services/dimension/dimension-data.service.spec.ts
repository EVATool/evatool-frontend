import {SampleDataService} from '../../spec/sample-data.service';
import {MockValueRestService} from './dimension-rest.service.spec';
import {TestBed} from '@angular/core/testing';

import {DimensionDataService} from './dimension-data.service';
import {HttpClientModule} from "@angular/common/http";

describe('DimensionDataService', () => {
  let sampleData: SampleDataService;
  let restService: MockValueRestService;
  let service: DimensionDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [MockValueRestService]
    });
    sampleData = TestBed.inject(SampleDataService);
    restService = TestBed.inject(MockValueRestService);
    service = TestBed.inject(DimensionDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#onInit', () => {
    it('should load dimensions', () => {
      // Arrange

      // Act
      service.onInit();

      // Assert
      expect(service.dimensions.length).toEqual(sampleData.dummyDimensionDtos.length);
    });

    it('should load dimensions types', () => {
      // Arrange

      // Act
      service.onInit();

      // Assert
      expect(service.dimensionTypes.length).toEqual(sampleData.dummyDimensionTypes.length);
    });

    it('should fire \'loadedDimensions\' event', () => {
      // Arrange
      spyOn(service.loadedDimensions, 'emit');

      // Act
      service.onInit();

      // Assert
      expect(service.loadedDimensions.emit).toHaveBeenCalled();
    });

    it('should fire \'loadedDimensionTypes\' event', () => {
      // Arrange
      spyOn(service.loadedDimensionTypes, 'emit');

      // Act
      service.onInit();

      // Assert
      expect(service.loadedDimensionTypes.emit).toHaveBeenCalled();
    });
  });
});
