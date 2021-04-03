import {SampleDataService} from '../../spec/sample-data.service';
import {RestSettings} from '../../settings/RestSettings';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {ValueRestService} from './value-rest.service';
import {LogService} from "../../../shared/services/log.service";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {ValueDto} from "../../dtos/ValueDto";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MockedValueRestService extends ValueRestService {
  constructor(
    logger: LogService,
    http: HttpClient,
    private sampleData: SampleDataService) {
    super(logger, http);
  }

  getValues(): Observable<ValueDto[]> {
    return of(this.sampleData.dummyValueDtos)
  }

  getValueTypes(): Observable<string[]> {
    return of(this.sampleData.dummyValueTypes)
  }
}

describe('ValueRestService', () => {
  let sampleData: SampleDataService;
  let httpMock: HttpTestingController;
  let service: ValueRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    sampleData = TestBed.inject(SampleDataService);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ValueRestService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all values>', () => {
    // Arrange
    const dummyDtos = sampleData.dummyValueDtos;

    // Act
    service.getValues().subscribe(values => {
      expect(values.length).toBe(dummyDtos.length);
      expect(values).toEqual(dummyDtos);
    });

    // Assert
    const req = httpMock.expectOne(RestSettings.valuesUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyDtos);
  });

  it('should return all value types', () => {
    // Arrange
    const dummyDtos = sampleData.dummyValueTypes;

    // Act
    service.getValueTypes().subscribe(valuesTypes => {
      expect(valuesTypes.length).toBe(dummyDtos.length);
      expect(valuesTypes).toEqual(dummyDtos);
    });

    // Assert
    const req = httpMock.expectOne(RestSettings.valueTypesUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyDtos);
  });
});
