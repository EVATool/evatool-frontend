import { DimensionRestService } from './dimension-rest.service';
import { DataLoader } from './../../settings/DataLoader';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { DimensionDataService } from './dimension-data.service';
import { Observable } from 'rxjs';

describe('DimensionDataService', () => {
  let service: DimensionDataService;
  let restService: DimensionRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    restService = TestBed.inject(DimensionRestService);
    service = TestBed.inject(DimensionDataService);
    service.useDummyData = false;
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
      observer.next(DataLoader.dummyDimensionDtos);
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
      observer.next(DataLoader.dummyDimensionTypes);
      observer.complete();
    }));

    // Act
    service.onInit();

    // Assert
    expect(service.loadedDimensionTypes.emit).toHaveBeenCalled();
  });
});
