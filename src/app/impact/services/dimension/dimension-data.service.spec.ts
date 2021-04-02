import {SampleDataService} from '../../spec/sample-data.service';
import {MockedValueRestService} from './dimension-rest.service.spec';
import {TestBed} from '@angular/core/testing';

import {DimensionDataService} from './dimension-data.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DimensionRestService} from "./dimension-rest.service";

describe('DimensionDataService', () => {
  let sampleData: SampleDataService;
  let service: DimensionDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: DimensionRestService,
          useClass: MockedValueRestService
        }]
    });

    sampleData = TestBed.inject(SampleDataService);
    service = TestBed.inject(DimensionDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#onInit', () => {
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

    it('should load dimensions', () => {
      // Arrange
      spyOn(service.loadedDimensions, 'emit');

      // Act
      service.onInit();

      // Assert
      expect(service.dimensions).toEqual(sampleData.dummyValues);
    });

    it('should load dimensions types', () => {
      // Arrange
      spyOn(service.loadedDimensionTypes, 'emit');

      // Act
      service.onInit();

      // Assert
      expect(service.dimensionTypes).toEqual(sampleData.dummyDimensionTypes);
    });
  });
});
