import {TestBed} from '@angular/core/testing';

import {AnalysisDataService} from './analysis-data.service';
import {SpecService} from '../spec.service';
import {SampleDataService} from '../sample-data.service';
import {Router} from '@angular/router';
import {Analysis} from '../../model/Analysis';

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
          }
        }
      ]
    });
    service = TestBed.inject(AnalysisDataService);
    service.init();
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

    // then
    service.loadedAnalyses.subscribe((analyses: Analysis[]) => {
      expect(analyses).toEqual(data.analyses);
    });

    // when
    service.loadAnalyses();
  });

  it('should change current analysis', () => {
    // given
    const analysisId = '1';

    // then
    service.loadedCurrentAnalysis.subscribe((analysis: Analysis) => {
      expect(analysis.id).toEqual(analysisId);
    });

    // when
    service.changeCurrentAnalysis(analysisId);
  });

  it('should create analysis', () => {
    // given
    const createAnalysis = data.analyses[0];

    // then
    service.createdAnalysis.subscribe((analysis: Analysis) => {
      expect(service.analyses).toContain(analysis);
    });

    // when
    service.createAnalysis(createAnalysis);
  });

  it('should update analysis', () => {
    // given
    const updatedAnalysis = data.analyses[0];

    // then
    service.updatedAnalysis.subscribe((analysis: Analysis) => {
      expect(updatedAnalysis).toEqual(analysis);
    });

    // when
    updatedAnalysis.isTemplate = !updatedAnalysis.isTemplate;
    service.updateAnalysis(updatedAnalysis);
  });

  it('should delete analysis', () => {
    // given
    const deletedAnalysis = data.analyses[0];

    // then
    service.deletedAnalysis.subscribe((analysis: Analysis) => {
      expect(service.analyses).not.toContain(analysis);
    });

    // when
    service.deleteAnalysis(deletedAnalysis);
  });

  it('should create a default analysis', () => {
    // given

    // when
    const defaultAnalysis = service.createDefaultAnalysis();

    // then
    expect(defaultAnalysis.id).toBeUndefined();
    expect(defaultAnalysis.prefixSequenceId).toBeUndefined();
    expect(defaultAnalysis.name).toEqual('');
    expect(defaultAnalysis.description).toEqual('');
    expect(defaultAnalysis.isTemplate).toEqual(false);
    expect(defaultAnalysis.imageUrl).toBeUndefined();
    expect(defaultAnalysis.lastUpdated).toBeUndefined();
  });

  describe('event emitter', () => {
    it('should fire loaded analyses event', () => {
      // given
      spyOn(service.loadedAnalyses, 'emit');

      // when
      service.loadAnalyses();

      // then
      expect(service.loadedAnalyses.emit).toHaveBeenCalled();
    });

    it('should fire change current analysis event', () => {
      // given
      spyOn(service.loadedCurrentAnalysis, 'emit');

      // when
      service.changeCurrentAnalysis('1');

      // then
      expect(service.loadedCurrentAnalysis.emit).toHaveBeenCalled();
    });

    it('should fire createdAnalysis event when deep copying analysis', () => {
      // given
      const templateAnalysis = data.analyses[0];
      const analysis = data.analyses[1];
      spyOn(service.createdAnalysis, 'emit');

      // when
      service.deepCopy(templateAnalysis, analysis);

      // then
      expect(service.createdAnalysis.emit).toHaveBeenCalled();
    });

    it('should fire created analysis event', () => {
      // given
      const createAnalysis = data.analyses[0];
      spyOn(service.createdAnalysis, 'emit');

      // when
      service.createAnalysis(createAnalysis);

      // then
      expect(service.createdAnalysis.emit).toHaveBeenCalled();
    });

    it('should fire updated analysis event', () => {
      // given
      const updateAnalysis = data.analyses[0];
      spyOn(service.updatedAnalysis, 'emit');

      // when
      service.updateAnalysis(updateAnalysis);

      // then
      expect(service.updatedAnalysis.emit).toHaveBeenCalled();
    });

    it('should fire deleted analysis event', () => {
      // given
      const deleteAnalysis = data.analyses[0];
      spyOn(service.deletedAnalysis, 'emit');

      // when
      service.deleteAnalysis(deleteAnalysis);

      // then
      expect(service.deletedAnalysis.emit).toHaveBeenCalled();
    });
  });
});
