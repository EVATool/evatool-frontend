import {SampleDataService} from '../../spec/sample-data.service';
import {MockValueRestService} from './dimension-rest.service.spec';
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
          useClass: MockValueRestService
        }]
    });

    sampleData = TestBed.inject(SampleDataService);
    service = TestBed.inject(DimensionDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#onInit', () => {
    it('should load dimensions', () => {
      // Arrange
      spyOn(service.loadedDimensions, 'emit');

      // Act
      service.loadedDimensions.subscribe(dimensions => {
        expect(1).toEqual(2); // not called...
        expect(service.dimensions).toEqual(sampleData.dummyDimensionDtos);
      });

      // Assert
      service.onInit();
      expect(service.loadedDimensions.emit).toHaveBeenCalled();
    });

    it('should load dimensions types', () => {
      // Arrange

      // Act
      service.onInit();

      // Assert
      service.loadedDimensionTypes.subscribe(dimensionTypes => {
        expect(service.dimensionTypes).toEqual(sampleData.dummyDimensionTypes);
      });
    });
  });
});
