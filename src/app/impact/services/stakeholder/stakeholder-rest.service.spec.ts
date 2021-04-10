import {SampleDataService} from '../../spec/sample-data.service';
import {RestSettings} from '../../settings/RestSettings';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {StakeholderRestService} from './stakeholder-rest.service';
import {LogService} from "../../../shared/services/log.service";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {StakeholderDto} from "../../dtos/StakeholderDto";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MockedStakeholderRestService extends StakeholderRestService {
  constructor(
    logger: LogService,
    http: HttpClient,
    data: SampleDataService) {
    super(logger, http, data)
    this.mocked = true;
  }
}

describe('StakeholderRestService', () => {
  let data: SampleDataService;
  let httpMock: HttpTestingController;
  let service: StakeholderRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    data = TestBed.inject(SampleDataService);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(StakeholderRestService);
    service.testing = true;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all stakeholders>', () => {
    // Arrange
    const dummyDtos = data.dummyStakeholderDtos;

    // Act
    service.getStakeholders().subscribe(stakeholders => {
      expect(stakeholders.length).toBe(dummyDtos.length);
      expect(stakeholders).toEqual(dummyDtos);
    });

    // Assert
    const req = httpMock.expectOne(RestSettings.stakeholdersUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyDtos);
  });
});
