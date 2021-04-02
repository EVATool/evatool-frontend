import {SampleDataService} from '../../spec/sample-data.service';
import {RestSettings} from '../../settings/RestSettings';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {StakeholderRestService} from './stakeholder-rest.service';
import {LogService} from "../../../shared/services/log.service";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {StakeholderDto} from "../../dtos/StakeholderDto";


export class MockedStakeholderRestService extends StakeholderRestService {
  constructor(
    logger: LogService,
    http: HttpClient,
    private sampleData: SampleDataService) {
    super(logger, http)
  }

  getStakeholders(): Observable<StakeholderDto[]> {
    return of(this.sampleData.dummyStakeholderDtos);
  }
}

describe('StakeholderRestService', () => {
  let sampleData: SampleDataService;
  let httpMock: HttpTestingController;
  let service: StakeholderRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    sampleData = TestBed.inject(SampleDataService);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(StakeholderRestService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<StakeholderDto[]>', () => {
    // Arrange
    const dummyDtos = sampleData.dummyStakeholderDtos;

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
