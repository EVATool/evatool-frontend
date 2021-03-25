import { RestSettings } from './../../settings/RestSettings';
import { DataLoader } from './../../settings/DataLoader';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AnalysisRestService } from './analysis-rest.service';

describe('AnalysisRestService', () => {
  let httpMock: HttpTestingController;
  let service: AnalysisRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AnalysisRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<AnalysisDto>', () => {
    // Arrage
    const dummyDto = DataLoader.dummyAnalysisDtos[0];

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
