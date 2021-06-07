import {TestBed} from '@angular/core/testing';

import {ImpactRestService} from './impact-rest.service';
import {SpecService} from '../spec.service';
import {SampleDataService} from '../sample-data.service';
import {HttpTestingController} from '@angular/common/http/testing';

describe('ImpactRestService', () => {
  let service: ImpactRestService;
  let data: SampleDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(ImpactRestService);
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

    it('should find impacts by analysisId', () => {
      // given

      // when
      service.getImpactsByAnalysisId('1').subscribe();

      // then
      const req = httpMock.expectOne(service.impactsUrl + service.byAnalysisId + '1');
      expect(req.request.method).toBe('GET');
    });

    it('should create impact', () => {
      // given
      const impactDto = data.impactDtoList[0];

      // when
      service.createImpact(impactDto).subscribe();

      // then
      const req = httpMock.expectOne(service.impactsUrl);
      expect(req.request.method).toBe('POST');
    });

    it('should update impact', () => {
      // given
      const impactDto = data.impactDtoList[0];

      // when
      service.updateImpact(impactDto).subscribe();

      // then
      const req = httpMock.expectOne(service.impactsUrl);
      expect(req.request.method).toBe('PUT');
    });

    it('should delete impact', () => {
      // given
      const impactDto = data.impactDtoList[0];

      // when
      service.deleteImpact(impactDto.id).subscribe();

      // then
      const req = httpMock.expectOne(service.impactsUrl + '/' + impactDto.id);
      expect(req.request.method).toBe('DELETE');
    });
  });
});
