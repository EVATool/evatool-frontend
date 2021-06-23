import {TestBed} from '@angular/core/testing';

import {AnalysisRestService} from './analysis-rest.service';
import {SpecService} from '../spec.service';
import {SampleDataService} from '../sample-data.service';
import {HttpTestingController} from '@angular/common/http/testing';
import {AnalysisDto} from '../../dto/AnalysisDto';

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
      service.getAnalysisById(analysisDto.id).subscribe((analysisDtoResponse: AnalysisDto) => {
        expect(analysisDtoResponse).toEqual(analysisDto);
      });
    });

    it('should find all analyses', () => {
      // given

      // when
      const analysisDtoList = data.analysesDtoList;

      // then
      service.getAnalyses().subscribe((analysisDtoListResponse: AnalysisDto[]) => {
        expect(analysisDtoListResponse).toEqual(analysisDtoList);
      });
    });

    it('should deep copy analysis', () => {
      // given

      // when
      const analysisDto = data.analysesDtoList[0];

      // then
      service.deepCopy(analysisDto.id, analysisDto).subscribe((analysisDtoResponse: AnalysisDto) => {
        expect(analysisDtoResponse).toEqual(analysisDto);
      });
    });

    it('should create analysis', () => {
      // given

      // when
      const analysisDto = data.analysesDtoList[0];

      // then
      service.createAnalysis(analysisDto).subscribe((analysisDtoResponse: AnalysisDto) => {
        expect(analysisDtoResponse).toEqual(analysisDto);
      });
    });

    // update
    it('should update analysis', () => {
      // given

      // when
      const analysisDto = data.analysesDtoList[0];

      // then
      service.updateAnalysis(analysisDto).subscribe((analysisDtoResponse: AnalysisDto) => {
        expect(analysisDtoResponse).toEqual(analysisDto);
      });
    });

    // delete
    it('should delete analysis', () => {
      // given

      // when
      const analysisDto = data.analysesDtoList[0];

      // then
      service.deleteAnalysis(analysisDto.id).subscribe(() => {
        // pass
      });
    });
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

    it('should deep copy analysis', () => {
      // given
      const templateAnalysisDto = data.analysesDtoList[0];
      const analysisDto = data.analysesDtoList[1];

      // when
      service.deepCopy(templateAnalysisDto.id, analysisDto).subscribe();

      // then
      const req = httpMock.expectOne(service.analysesDeepCopyUrl + '/' + templateAnalysisDto.id);
      expect(req.request.method).toBe('POST');
    });

    it('should create analysis', () => {
      // given
      const analysisDto = data.analysesDtoList[0];

      // when
      service.createAnalysis(analysisDto).subscribe();

      // then
      const req = httpMock.expectOne(service.analysesUrl);
      expect(req.request.method).toBe('POST');
    });

    it('should update analysis', () => {
      // given
      const analysisDto = data.analysesDtoList[0];

      // when
      service.updateAnalysis(analysisDto).subscribe();

      // then
      const req = httpMock.expectOne(service.analysesUrl);
      expect(req.request.method).toBe('PUT');
    });

    it('should delete analysis', () => {
      // given
      const analysisDto = data.analysesDtoList[0];

      // when
      service.deleteAnalysis(analysisDto.id).subscribe();

      // then
      const req = httpMock.expectOne(service.analysesUrl + '/' + analysisDto.id);
      expect(req.request.method).toBe('DELETE');
    });
  });
});
