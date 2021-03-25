import { SampleDataService } from './../../spec/sample-data.service';
import { DimensionRestService } from './dimension-rest.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { DimensionDataService } from './dimension-data.service';

describe('DimensionDataService', () => {
  let sampleData: SampleDataService;
  let restService: DimensionRestService;
  let service: DimensionDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    sampleData = TestBed.inject(SampleDataService);
    restService = TestBed.inject(DimensionRestService);
    service = TestBed.inject(DimensionDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#onInit', () => {
    it('should load dimensions', () => {
      // Arrange
      spyOn(restService, 'getDimensions').and.returnValue(sampleData.getObservable(sampleData.dummyDimensionDtos));

      // Act
      service.onInit();

      // Assert
      expect(service.dimensions.length).toEqual(sampleData.dummyDimensionDtos.length);
    });

    it('should load dimensions types', () => {
      // Arrange
      spyOn(restService, 'getDimensionTypes').and.returnValue(sampleData.getObservable(sampleData.dummyDimensionTypes));

      // Act
      service.onInit();

      // Assert
      expect(service.dimensionTypes.length).toEqual(sampleData.dummyDimensionTypes.length);
    });

    it('should fire \'loadedDimensions\' event', () => {
      // Arrange
      spyOn(service.loadedDimensions, 'emit');
      spyOn(restService, 'getDimensions').and.returnValue(sampleData.getObservable(sampleData.dummyDimensionDtos));

      // Act
      service.onInit();

      // Assert
      expect(service.loadedDimensions.emit).toHaveBeenCalled();
    });

    it('should fire \'loadedDimensionTypes\' event', () => {
      // Arrange
      spyOn(service.loadedDimensionTypes, 'emit');
      spyOn(restService, 'getDimensionTypes').and.returnValue(sampleData.getObservable(sampleData.dummyDimensionTypes));

      // Act
      service.onInit();

      // Assert
      expect(service.loadedDimensionTypes.emit).toHaveBeenCalled();
    });
  });
});
