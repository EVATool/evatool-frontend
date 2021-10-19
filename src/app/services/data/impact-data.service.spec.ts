import {TestBed} from '@angular/core/testing';

import {ImpactDataService} from './impact-data.service';
import {SpecService} from '../spec.service';
import {SampleDataService} from '../sample-data.service';
import {MasterService} from '../master.service';
import {Impact} from '../../model/Impact';

describe('ImpactDataService', () => {
  let service: ImpactDataService;
  let data: SampleDataService;
  let masterService: MasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(ImpactDataService);
    data = TestBed.inject(SampleDataService);
    masterService = TestBed.inject(MasterService);
    masterService.init();
    masterService.analysisData.changeCurrentAnalysis('1');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize', () => {
    // given

    // when

    // then

  });

  it('should create impact', () => {
    // given
    const createImpact = data.impacts[0];

    // then
    service.createdImpact.subscribe((impact: Impact) => {
      expect(service.impacts).toContain(impact);
    });

    // when
    service.createImpact(createImpact);
  });

  it('should update impact', () => {
    // given
    const updatedImpact = data.impacts[0];

    // then
    service.updatedImpact.subscribe((impact: Impact) => {
      expect(updatedImpact).toEqual(impact);
    });

    // when
    updatedImpact.description = 'updated';
    service.updateImpact(updatedImpact);
  });

  it('should delete impact', () => {
    // given
    const deletedImpact = service.impacts[0];

    // then
    service.deletedImpact.subscribe((impact: Impact) => {
      expect(service.impacts).not.toContain(impact);
    });

    // when
    service.deleteImpact(deletedImpact);
  });

  it('should create a default impact', () => {
    // given

    // when
    const defaultImpact = service.createDefaultImpact(data.analyses[0],
      data.stakeholders[0],
      data.values[0]);

    // then
    expect(defaultImpact.id).toBeUndefined();
    expect(defaultImpact.prefixSequenceId).toBeUndefined();
    expect(defaultImpact.merit).toEqual(0);
    expect(defaultImpact.description).toEqual('');
    expect(defaultImpact.isGoal).toBeUndefined();
    expect(defaultImpact.analysis).toBeDefined();
    expect(defaultImpact.value).toBeDefined();
    expect(defaultImpact.stakeholder).toBeDefined();
  });

  describe('event emitter', () => {
    it('should fire created impacts event', () => {
      // given
      const createImpacts = data.impacts[0];
      spyOn(service.createdImpact, 'next');

      // when
      service.createImpact(createImpacts);

      // then
      expect(service.createdImpact.next).toHaveBeenCalled();
    });

    it('should fire updated impacts event', () => {
      // given
      const updateImpacts = data.impacts[0];
      spyOn(service.updatedImpact, 'next');

      // when
      service.updateImpact(updateImpacts);

      // then
      expect(service.updatedImpact.next).toHaveBeenCalled();
    });

    it('should fire deleted impacts event', () => {
      // given
      const deleteImpacts = data.impacts[0];
      spyOn(service.deletedImpact, 'next');

      // when
      service.deleteImpact(deleteImpacts);

      // then
      expect(service.deletedImpact.next).toHaveBeenCalled();
    });
  });
});
