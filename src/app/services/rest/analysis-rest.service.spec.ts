import {TestBed} from '@angular/core/testing';

import {AnalysisRestService} from './analysis-rest.service';
import {SpecService} from '../spec.service';
import {SampleDataService} from '../sample-data.service';
import {Analysis} from '../../model/Analysis';
import {HttpTestingController} from '@angular/common/http/testing';

describe('AnalysisRestService', () => {
  let service: AnalysisRestService;
  let data: SampleDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports
    });
    service = TestBed.inject(AnalysisRestService);
    data = TestBed.inject(SampleDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Rest calls (TEST)', () => {

    it('should find analysis by id', () => {
      // given

      // when
      const analysisDto = data.analysesDtoList[0];

      // then
      service.getAnalysisById(analysisDto.id).subscribe((analysisDtoResponse: Analysis) => {
        expect(analysisDtoResponse).toEqual(analysisDto);
      });
    });

    it('should find all analyses', () => {
      // given

      // when
      const analysisDtoList = data.analysesDtoList;

      // then
      service.getAnalyses().subscribe((analysisDtoListResponse: Analysis[]) => {
        expect(analysisDtoListResponse).toEqual(analysisDtoList);
      });
    });

    it('should deep copy analysis', () => {
      // given

      // when
      const analysisDto = data.analysesDtoList[0];

      // then
      service.deepCopy(analysisDto.id, analysisDto).subscribe((analysisDtoResponse: Analysis) => {
        expect(analysisDtoResponse).toEqual(analysisDto);
      });
    });

    // create

    // update

    // delete

  });

  describe('Rest calls (MOCK)', () => {

    beforeEach(() => {
      service.testing = false;
    });

    it('should find analysis by id', () => {
      // given

      // when
      service.getAnalysisById('1').subscribe();

      // then
      const req = httpMock.expectOne(service.analysesUrl + '/1');
      expect(req.request.method).toBe('GET');
    });

    it('should find all analyses', () => {
      // given

      // when
      service.getAnalyses().subscribe();

      // then
      const req = httpMock.expectOne(service.analysesUrl);
      expect(req.request.method).toBe('GET');
    });
  });
});
