import {SampleDataService} from '../../spec/sample-data.service';
import {RestSettings} from '../../settings/RestSettings';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {DimensionRestService} from './dimension-rest.service';
import {LogService} from "../../../shared/services/log.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {DimensionDto} from "../../dtos/DimensionDto";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MockValueRestService extends DimensionRestService {
  constructor(
    logger: LogService,
    http: HttpClient,
    private sampleData: SampleDataService) {
    super(logger, http);
  }

  getDimensions(): Observable<DimensionDto[]> {
    return of(this.sampleData.dummyDimensionDtos)
  }

  getDimensionTypes(): Observable<string[]> {
    return of(this.sampleData.dummyDimensionTypes)
  }
}

describe('DimensionRestService', () => {
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

  it('should return an Observable<DimensionDto[]>', () => {
    // Arrange
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

  it('should return an Observable<string[]>', () => {
    // Arrange
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


