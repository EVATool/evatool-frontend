import { RestSettings } from './../../settings/RestSettings';
import { DataLoader } from './../../settings/DataLoader';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DimensionRestService } from './dimension-rest.service';

describe('DimensionRestService', () => {
  let httpMock: HttpTestingController;
  let service: DimensionRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(DimensionRestService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getDimensions', () => {
    it('should return an Observable<DimensionDto[]>', () => {
      // Arrage
      const dummyDtos = DataLoader.dummyDimensionDtos;

      // Act
      service.getDimensions().subscribe(dimensions => {
        expect(dimensions.length).toBe(dummyDtos.length);
        expect(dimensions).toEqual(dummyDtos);
      });

      // Assert
      const req = httpMock.expectOne(RestSettings.dimensionsUrl);
      expect(req.request.method).toBe('GET');
      req.flush(dummyDtos);
    });
  });

  describe('#getDimensionTypes', () => {
    it('should return an Observable<string[]>', () => {
      // Arrage
      const dummyDtos = DataLoader.dummyDimensionTypes;

      // Act
      service.getDimensionTypes().subscribe(dimensionTypes => {
        expect(dimensionTypes.length).toBe(dummyDtos.length);
        expect(dimensionTypes).toEqual(dummyDtos);
      });

      // Assert
      const req = httpMock.expectOne(RestSettings.dimensionTypesUrl);
      expect(req.request.method).toBe('GET');
      req.flush(dummyDtos);
    });
  });
});

