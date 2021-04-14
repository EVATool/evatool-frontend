import {SampleDataService} from '../../spec/sample-data.service';
import {RestSettings} from '../../settings/RestSettings';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {ValueRestService} from './value-rest.service';
import {LogService} from "../../../shared/services/log.service";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MockedValueRestService extends ValueRestService {
  constructor(
    logger: LogService,
    http: HttpClient,
    data: SampleDataService) {
    super(logger, http, data);
    this.mocked = true;
  }
}

describe('ValueRestService', () => {
  let data: SampleDataService;
  let httpMock: HttpTestingController;
  let service: ValueRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    data = TestBed.inject(SampleDataService);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ValueRestService);
    service.testing = true;
  });

  afterEach(() => {
    //httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all values>', () => {
    // Arrange
    const dummyDtos = data.dummyValueDtos;

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

  it('should return all values by analysis id', () => {
    // Arrange
    const analysisId = data.dummyValueDtos[0].analysis.rootEntityID
    const dummyDtos = data.dummyValueDtos.filter(value => value.analysis.rootEntityID == analysisId);

    // Act
    service.getValuesByAnalysisId(analysisId).subscribe(values => {
      expect(values.length).toBe(dummyDtos.length);
      expect(values).toEqual(dummyDtos);
    });

    // Assert
    const req = httpMock.expectOne(RestSettings.valuesUrl + '?analysisId=' + analysisId);
    expect(req.request.method).toBe('GET');
    req.flush(dummyDtos);
  });

  it('should create a value', () => {
    // Arrange
    const dummyDto = data.dummyValueDtos[0];

    // Act
    service.createValue(dummyDto).subscribe(value => {
      expect(value).toEqual(dummyDto);
    });

    // Assert
    const req = httpMock.expectOne(RestSettings.valuesUrl);
    expect(req.request.method).toBe('POST');
    req.flush(dummyDto);
  });

  it('should update a value', () => {
    // Arrange
    const dummyDto = data.dummyValueDtos[0];

    // Act
    service.updateValue(dummyDto).subscribe(value => {
      expect(value).toEqual(dummyDto);
    });

    // Assert
    const req = httpMock.expectOne(RestSettings.valuesUrl);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyDto);
  });

  it('should delete a value', () => {
    // Arrange
    const dummyDto = data.dummyValueDtos[0];

    // Act
    service.deleteValue(dummyDto).subscribe(value => {
      expect(value).toEqual(dummyDto);
    });

    // Assert
    const req = httpMock.expectOne(RestSettings.valuesUrl + '/' + dummyDto.id);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyDto);
  });

  it('should return all value types', () => {
    // Arrange
    const dummyDtos = data.dummyValueTypes;

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
