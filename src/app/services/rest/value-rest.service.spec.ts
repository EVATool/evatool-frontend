import {TestBed} from '@angular/core/testing';

import {ValueRestService} from './value-rest.service';
import {SpecService} from '../spec.service';
import {SampleDataService} from '../sample-data.service';
import {HttpTestingController} from '@angular/common/http/testing';

describe('ValueRestService', () => {
  let service: ValueRestService;
  let data: SampleDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(ValueRestService);
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

    it('should find values by analysisId', () => {
      // given

      // when
      service.getValuesByAnalysisId('1').subscribe();

      // then
      const req = httpMock.expectOne(service.valuesUrl + service.byAnalysisId + '1');
      expect(req.request.method).toBe('GET');
    });

    it('should create value', () => {
      // given
      const valueDto = data.valueDtoList[0];

      // when
      service.createValue(valueDto).subscribe();

      // then
      const req = httpMock.expectOne(service.valuesUrl);
      expect(req.request.method).toBe('POST');
    });

    it('should update value', () => {
      // given
      const valueDto = data.valueDtoList[0];

      // when
      service.updateValue(valueDto).subscribe();

      // then
      const req = httpMock.expectOne(service.valuesUrl);
      expect(req.request.method).toBe('PUT');
    });

    it('should delete value', () => {
      // given
      const valueDto = data.valueDtoList[0];

      // when
      service.deleteValue(valueDto.id).subscribe();

      // then
      const req = httpMock.expectOne(service.valuesUrl + '/' + valueDto.id);
      expect(req.request.method).toBe('DELETE');
    });

    it('should find value types', () => {
      // given

      // when
      service.getValueTypes().subscribe();

      // then
      const req = httpMock.expectOne(service.valuesTypesUrl);
      expect(req.request.method).toBe('GET');
    });
  });
});
