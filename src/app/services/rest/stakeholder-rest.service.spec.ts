import {TestBed} from '@angular/core/testing';

import {StakeholderRestService} from './stakeholder-rest.service';
import {SpecService} from '../spec.service';
import {SampleDataService} from '../sample-data.service';
import {HttpTestingController} from '@angular/common/http/testing';

describe('StakeholderRestService', () => {
  let service: StakeholderRestService;
  let data: SampleDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(StakeholderRestService);
    data = TestBed.inject(SampleDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Rest calls (MOCK)', () => {

    beforeEach(() => {
      service.testing = false;
    });

    it('should find stakeholders by analysisId', () => {
      // given

      // when
      service.getStakeholdersByAnalysisId('1').subscribe();

      // then
      const req = httpMock.expectOne(service.stakeholdersUrl + service.byAnalysisId + '1');
      expect(req.request.method).toBe('GET');
    });

    it('should create stakeholder', () => {
      // given
      const stakeholderDto = data.stakeholderDtoList[0];

      // when
      service.createStakeholder(stakeholderDto).subscribe();

      // then
      const req = httpMock.expectOne(service.stakeholdersUrl);
      expect(req.request.method).toBe('POST');
    });

    it('should update stakeholder', () => {
      // given
      const stakeholderDto = data.stakeholderDtoList[0];

      // when
      service.updateStakeholder(stakeholderDto).subscribe();

      // then
      const req = httpMock.expectOne(service.stakeholdersUrl);
      expect(req.request.method).toBe('PUT');
    });

    it('should delete stakeholder', () => {
      // given
      const stakeholderDto = data.stakeholderDtoList[0];

      // when
      service.deleteStakeholder(stakeholderDto.id).subscribe();

      // then
      const req = httpMock.expectOne(service.stakeholdersUrl + '/' + stakeholderDto.id);
      expect(req.request.method).toBe('DELETE');
    });

    it('should find stakeholder levels', () => {
      // given

      // when
      service.getStakeholderLevels().subscribe();

      // then
      const req = httpMock.expectOne(service.stakeholderLevelsUrl);
      expect(req.request.method).toBe('GET');
    });

    it('should find stakeholder priorities', () => {
      // given

      // when
      service.getStakeholderPriorities().subscribe();

      // then
      const req = httpMock.expectOne(service.stakeholderPriorityUrl);
      expect(req.request.method).toBe('GET');
    });
  });
});
