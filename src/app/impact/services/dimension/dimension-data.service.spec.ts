import {SampleDataService} from '../../spec/sample-data.service';
import {MockValueRestService} from './dimension-rest.service.spec';
import {TestBed} from '@angular/core/testing';

import {DimensionDataService} from './dimension-data.service';
import {HttpClientModule} from "@angular/common/http";
import {DimensionRestService} from "./dimension-rest.service";

describe('DimensionDataService', () => {
  let sampleData: SampleDataService;
  let restService: DimensionRestService;
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
      service.loadedDimensions.subscribe(dimensions => {
        expect(service.dimensions).toEqual(sampleData.dummyDimensionDtos);
      });
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
