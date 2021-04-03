import {SampleDataService} from '../../spec/sample-data.service';
import {RestSettings} from '../../settings/RestSettings';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {AnalysisRestService} from './analysis-rest.service';
import {Observable, of} from "rxjs";
import {AnalysisDto} from "../../dtos/AnalysisDto";
import {LogService} from "../../../shared/services/log.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MockedAnalysisRestService extends AnalysisRestService {
  constructor(
    logger: LogService,
    http: HttpClient,
    private sampleData: SampleDataService) {
    super(logger, http);
  }

  getAnalysisById(id: string): Observable<AnalysisDto> {
    return of(this.sampleData.dummyAnalysisDtos[0]);
  }
}

describe('AnalysisRestService', () => {
  let sampleData: SampleDataService;
  let httpMock: HttpTestingController;
  let service: AnalysisRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    sampleData = TestBed.inject(SampleDataService);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AnalysisRestService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an analysis by id', () => {
    // Arrange
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
