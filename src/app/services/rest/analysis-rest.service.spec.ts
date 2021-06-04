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

  it('should GET all analyses', () => {
    // given
    service.testing = true;

    // when
    const analyses = data.analysesDtoList;

    // then
    service.getAnalyses().subscribe((analysisDtoList: Analysis[]) => {
      expect(analysisDtoList).toEqual(analyses);
    });
  });

  it('should GET all analyses (MOCKED)', () => {
    // given
    service.testing = false;
    const analyses = data.analysesDtoList;

    // when
    service.getAnalyses().subscribe();

    // then
    const req = httpMock.expectOne(service.analysesUrl);
    expect(req.request.method).toBe('GET');
  });
});
