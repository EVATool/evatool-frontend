import {TestBed} from '@angular/core/testing';

import {RequirementRestService} from './requirement-rest.service';
import {SpecService} from '../spec.service';
import {SampleDataService} from '../sample-data.service';
import {HttpTestingController} from '@angular/common/http/testing';

describe('RequirementRestService', () => {
  let service: RequirementRestService;
  let data: SampleDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(RequirementRestService);
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

    it('should find requirements by analysisId', () => {
      // given

      // when
      service.getRequirementsByAnalysisId('1').subscribe();

      // then
      const req = httpMock.expectOne(service.requirementsUrl + service.byAnalysisId + '1');
      expect(req.request.method).toBe('GET');
    });

    it('should create requirement', () => {
      // given
      const requirementDto = data.requirementDtoList[0];

      // when
      service.createRequirement(requirementDto).subscribe();

      // then
      const req = httpMock.expectOne(service.requirementsUrl);
      expect(req.request.method).toBe('POST');
    });

    it('should update requirement', () => {
      // given
      const requirementDto = data.requirementDtoList[0];

      // when
      service.updateRequirement(requirementDto).subscribe();

      // then
      const req = httpMock.expectOne(service.requirementsUrl);
      expect(req.request.method).toBe('PUT');
    });

    it('should delete requirement', () => {
      // given
      const requirementDto = data.requirementDtoList[0];

      // when
      service.deleteRequirement(requirementDto.id).subscribe();

      // then
      const req = httpMock.expectOne(service.requirementsUrl + '/' + requirementDto.id);
      expect(req.request.method).toBe('DELETE');
    });
  });
});
