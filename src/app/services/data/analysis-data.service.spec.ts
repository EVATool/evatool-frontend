import {TestBed} from '@angular/core/testing';

import {AnalysisDataService} from './analysis-data.service';
import {SpecService} from '../spec.service';
import {SampleDataService} from '../sample-data.service';
import {Analysis} from '../../model/Analysis';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('AnalysisDataService', () => {
  let service: AnalysisDataService;
  let data: SampleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
      providers: [
        {
          provide: Router,
          useValue: {
            url: '/analysis?id=1'
          } // you could use also jasmine.createSpyObj() for methods
        }
      ]
    });
    service = TestBed.inject(AnalysisDataService);
    data = TestBed.inject(SampleDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize', () => { // TODO how to test router being read via subscribe in init method?
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
