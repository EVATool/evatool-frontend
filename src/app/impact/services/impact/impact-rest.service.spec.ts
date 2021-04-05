import {SampleDataService} from '../../spec/sample-data.service';
import {RestSettings} from '../../settings/RestSettings';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {ImpactRestService} from './impact-rest.service';
import {Injectable} from "@angular/core";
import {LogService} from "../../../shared/services/log.service";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {ImpactDto} from "../../dtos/ImpactDto";

@Injectable({
  providedIn: 'root'
})
export class MockedImpactRestService extends ImpactRestService {
  constructor(
    logger: LogService,
    http: HttpClient,
    private sampleData: SampleDataService) {
    super(logger, http)
  }

  getImpactsByAnalysisId(analysisId: string): Observable<ImpactDto[]> {
    return of(this.sampleData.dummyImpactDtos);
  }

  createImpact(impactDto: ImpactDto): Observable<any> {
    return of(this.sampleData.getDummyImpactDto());
  }

  updateImpact(impactDto: ImpactDto): Observable<any> {
    return of(this.sampleData.getDummyImpactDto());
  }

  deleteImpact(impactDto: ImpactDto): Observable<any> {
    return of(this.sampleData.getDummyImpactDto());
  }
}

describe('ImpactRestService', () => {
  let sampleData: SampleDataService;
  let httpMock: HttpTestingController;
  let service: ImpactRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    sampleData = TestBed.inject(SampleDataService);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ImpactRestService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all impacts by analysis id>', () => {
    // Arrange
    const analysisId = sampleData.dummyImpactDtos[0].analysis.id
    const dummyDtos = sampleData.dummyImpactDtos.filter(impact => impact.analysis.id == analysisId);

    // Act
    service.getImpactsByAnalysisId(analysisId).subscribe(impacts => {
      expect(impacts.length).toBe(dummyDtos.length);
      expect(impacts).toEqual(dummyDtos);
    });

    // Assert
    const req = httpMock.expectOne(RestSettings.impactsUrl + '?analysisId=' + analysisId);
    expect(req.request.method).toBe('GET');
    req.flush(dummyDtos);
  });

  it('should create an impact', () => {
    // Arrange
    const dummyDto = sampleData.dummyImpactDtos[0];

    // Act
    service.createImpact(dummyDto).subscribe(impact => {
      expect(impact).toEqual(dummyDto);
    });

    // Assert
    const req = httpMock.expectOne(RestSettings.impactsUrl);
    expect(req.request.method).toBe('POST');
    req.flush(dummyDto);
  });

  it('should update an impact', () => {
    // Arrange
    const dummyDto = sampleData.dummyImpactDtos[0];

    // Act
    service.updateImpact(dummyDto).subscribe(impact => {
      expect(impact).toEqual(dummyDto);
    });

    // Assert
    const req = httpMock.expectOne(RestSettings.impactsUrl);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyDto);
  });

  it('should delete an impact', () => {
    // Arrange
    const dummyDto = sampleData.dummyImpactDtos[0];

    // Act
    service.deleteImpact(dummyDto).subscribe(impact => {
      expect(impact).toEqual(dummyDto);
    });

    // Assert
    const req = httpMock.expectOne(RestSettings.impactsUrl + '/' + dummyDto.id);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyDto);
  });
});
