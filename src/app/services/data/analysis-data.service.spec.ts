import {TestBed} from '@angular/core/testing';

import {AnalysisDataService} from './analysis-data.service';
import {SpecService} from '../spec.service';
import {SampleDataService} from '../sample-data.service';
import {Analysis} from '../../model/Analysis';

describe('AnalysisDataService', () => {
  let service: AnalysisDataService;
  let data: SampleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(AnalysisDataService);
    data = TestBed.inject(SampleDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize', () => {
    // given

    // when

    // then

  });

  it('should load analyses', () => {
    // given
    spyOn(service.loadedAnalyses, 'emit');

    // when
    service.loadedAnalyses.subscribe((analyses: Analysis[]) => {
      expect(analyses).toEqual(data.analyses);
    });
    service.loadAnalyses();

    // then
    expect(service.loadedAnalyses.emit).toHaveBeenCalled();
    expect(service.analyses).toEqual(data.analyses);
  });
});
