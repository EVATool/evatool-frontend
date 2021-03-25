import { SampleDataGenerator } from './../../spec/sample-data.service';
import { RestSettings } from './../../settings/RestSettings';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AnalysisRestService } from './analysis-rest.service';

describe('AnalysisRestService', () => {
  let sampleData: SampleDataGenerator;
  let httpMock: HttpTestingController;
  let service: AnalysisRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    sampleData = TestBed.inject(SampleDataGenerator);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AnalysisRestService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getAnalysisById', () => {
    it('should return an Observable<AnalysisDto>', () => {
      // Arrage
      const dummyDto = sampleData.dummyAnalysisDtos[0];

      // Act
      service.getAnalysisById(dummyDto.rootEntityID).subscribe(analysis => {
        expect(analysis).toEqual(dummyDto);
      });

      // Assert
      const req = httpMock.expectOne(RestSettings.analysesUrl + '/' + dummyDto.rootEntityID);
      expect(req.request.method).toBe('GET');
      req.flush(dummyDto);
    });
  });
});
