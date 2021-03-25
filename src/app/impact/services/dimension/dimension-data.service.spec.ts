import { SampleDataService } from './../../spec/sample-data.service';
import { DimensionRestService } from './dimension-rest.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { DimensionDataService } from './dimension-data.service';
import { Observable } from 'rxjs';

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

  it('should load data', () => {
    // Arrange

    // Act

    // Assert

  });

  it('should fire \'loadedDimensions\' event', () => {
    // Arrange
    spyOn(service.loadedDimensions, 'emit');
    spyOn(restService, 'getDimensions').and.returnValue(new Observable((observer) => {
      observer.next(sampleData.dummyDimensionDtos);
      observer.complete();
    }));

    // Act
    service.onInit();

    // Assert
    expect(service.loadedDimensions.emit).toHaveBeenCalled();
  });

  it('should fire \'loadedDimensionTypes\' event', () => {
    // Arrange
    spyOn(service.loadedDimensionTypes, 'emit');
    spyOn(restService, 'getDimensionTypes').and.returnValue(new Observable((observer) => {
      observer.next(sampleData.dummyDimensionTypes);
      observer.complete();
    }));

    // Act
    service.onInit();

    // Assert
    expect(service.loadedDimensionTypes.emit).toHaveBeenCalled();
  });
});
