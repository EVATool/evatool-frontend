import { SampleDataService } from './../../spec/sample-data.service';
import { RestSettings } from './../../settings/RestSettings';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { DimensionRestService } from './dimension-rest.service';

describe('DimensionRestService', () => {
  describe('Mocked', () => {
    let sampleData: SampleDataService;
    let httpMock: HttpTestingController;
    let service: DimensionRestService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      sampleData = TestBed.inject(SampleDataService);
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
        const dummyDtos = sampleData.dummyDimensionDtos;

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
        const dummyDtos = sampleData.dummyDimensionTypes;

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

  // TODO: Before writing these tests: Decide whether to add HttpResponse to ALL Rest service calls and check response here.
  describe('Backend', () => {
    let service: DimensionRestService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule]
      });
      service = TestBed.inject(DimensionRestService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    describe('#getDimensions', () => {
      it('should return an Observable<DimensionDto[]>', () => {
        // Arrage

        // Act

        // Assert

      });
    });

    describe('#getDimensionTypes', () => {
      it('should return an Observable<string[]>', () => {
        // Arrage

        // Act

        // Assert

      });
    });
  });
});
