import {TestBed} from '@angular/core/testing';

import {VariantRestService} from './variant-rest.service';
import {SpecService} from '../spec.service';
import {SampleDataService} from '../sample-data.service';
import {HttpTestingController} from '@angular/common/http/testing';

describe('VariantRestService', () => {
  let service: VariantRestService;
  let data: SampleDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(VariantRestService);
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

    it('should find variants by analysisId', () => {
      // given

      // when
      service.getVariantsByAnalysisId('1').subscribe();

      // then
      const req = httpMock.expectOne(service.variantsUrl + service.byAnalysisId + '1');
      expect(req.request.method).toBe('GET');
    });

    it('should create variant', () => {
      // given
      const variantDto = data.variantDtoList[0];

      // when
      service.createVariant(variantDto).subscribe();

      // then
      const req = httpMock.expectOne(service.variantsUrl);
      expect(req.request.method).toBe('POST');
    });

    it('should update variant', () => {
      // given
      const variantDto = data.variantDtoList[0];

      // when
      service.updateVariant(variantDto).subscribe();

      // then
      const req = httpMock.expectOne(service.variantsUrl);
      expect(req.request.method).toBe('PUT');
    });

    it('should delete variant', () => {
      // given
      const variantDto = data.variantDtoList[0];

      // when
      service.deleteVariant(variantDto.id).subscribe();

      // then
      const req = httpMock.expectOne(service.variantsUrl + '/' + variantDto.id);
      expect(req.request.method).toBe('DELETE');
    });
  });
});
