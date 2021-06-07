import {TestBed} from '@angular/core/testing';

import {RequirementDeltaRestService} from './requirement-delta-rest.service';
import {HttpClientModule} from '@angular/common/http';
import {SpecService} from '../spec.service';
import {SampleDataService} from '../sample-data.service';
import {HttpTestingController} from '@angular/common/http/testing';

describe('RequirementDeltaRestService', () => {
  let service: RequirementDeltaRestService;
  let data: SampleDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
      providers: [HttpClientModule]
    });
    service = TestBed.inject(RequirementDeltaRestService);
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

    it('should find requirementDeltas by analysisId', () => {
      // given

      // when
      service.getRequirementDeltasByAnalysisId('1').subscribe();

      // then
      const req = httpMock.expectOne(service.requirementDeltasUrl + service.byAnalysisId + '1');
      expect(req.request.method).toBe('GET');
    });

    it('should create requirementDelta', () => {
      // given
      const requirementDeltaDto = data.requirementDeltaDtoList[0];

      // when
      service.createRequirementDelta(requirementDeltaDto).subscribe();

      // then
      const req = httpMock.expectOne(service.requirementDeltasUrl);
      expect(req.request.method).toBe('POST');
    });

    it('should update requirementDelta', () => {
      // given
      const requirementDeltaDto = data.requirementDeltaDtoList[0];

      // when
      service.updateRequirementDelta(requirementDeltaDto).subscribe();

      // then
      const req = httpMock.expectOne(service.requirementDeltasUrl);
      expect(req.request.method).toBe('PUT');
    });

    it('should delete requirementDelta', () => {
      // given
      const requirementDeltaDto = data.requirementDeltaDtoList[0];

      // when
      service.deleteRequirementDelta(requirementDeltaDto.id).subscribe();

      // then
      const req = httpMock.expectOne(service.requirementDeltasUrl + '/' + requirementDeltaDto.id);
      expect(req.request.method).toBe('DELETE');
    });
  });
});
