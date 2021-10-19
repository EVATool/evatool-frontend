import {TestBed} from '@angular/core/testing';

import {RequirementDeltaDataService} from './requirement-delta-data.service';
import {SpecService} from '../spec.service';
import {RequirementDelta} from '../../model/RequirementDelta';
import {SampleDataService} from '../sample-data.service';
import {MasterService} from '../master.service';

describe('RequirementDeltaDeltaDataService', () => {
  let service: RequirementDeltaDataService;
  let data: SampleDataService;
  let masterService: MasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports
    });
    service = TestBed.inject(RequirementDeltaDataService);
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

  it('should create requirementDelta', () => {
    // given
    const createRequirementDelta = data.requirementDeltas[0];

    // then
    service.createdRequirementDelta.subscribe((requirementDelta: RequirementDelta) => {
      expect(service.requirementDeltas).toContain(requirementDelta);
    });

    // when
    service.createRequirementDelta(createRequirementDelta);
  });

  it('should update requirementDelta', () => {
    // given
    const updatedRequirementDelta = data.requirementDeltas[0];

    // then
    service.updatedRequirementDelta.subscribe((requirementDelta: RequirementDelta) => {
      expect(updatedRequirementDelta).toEqual(requirementDelta);
    });

    // when
    updatedRequirementDelta.overwriteMerit = 0.7;
    service.updateRequirementDelta(updatedRequirementDelta);
  });

  it('should delete requirementDelta', () => {
    // given
    const deletedRequirementDelta = service.requirementDeltas[0];

    // then
    service.deletedRequirementDelta.subscribe((requirementDelta: RequirementDelta) => {
      expect(service.requirementDeltas).not.toContain(requirementDelta);
    });

    // when
    service.deleteRequirementDelta(deletedRequirementDelta);
  });

  it('should create a default requirementDelta', () => {
    // given

    // when
    const defaultRequirementDelta = service.createDefaultRequirementDelta(data.impacts[0], data.requirements[0]);

    // then
    expect(defaultRequirementDelta.id).toBeUndefined();
    expect(defaultRequirementDelta.overwriteMerit).toEqual(defaultRequirementDelta.impact.merit);
    expect(defaultRequirementDelta.originalMerit).toBeUndefined();
    expect(defaultRequirementDelta.minOverwriteMerit).toBeUndefined();
    expect(defaultRequirementDelta.maxOverwriteMerit).toBeUndefined();
    expect(defaultRequirementDelta.meritColorCode).toBeUndefined();
    expect(defaultRequirementDelta.impact).toBeDefined();
    expect(defaultRequirementDelta.requirement).toBeDefined();
    expect(defaultRequirementDelta.visible).toBeFalse();
    expect(defaultRequirementDelta.hover).toBeFalse();
  });

  describe('event emitter', () => {
    it('should fire created requirementDeltas event', () => {
      // given
      const createRequirementDeltas = data.requirementDeltas[0];
      spyOn(service.createdRequirementDelta, 'next');

      // when
      service.createRequirementDelta(createRequirementDeltas);

      // then
      expect(service.createdRequirementDelta.next).toHaveBeenCalled();
    });

    it('should fire updated requirementDeltas event', () => {
      // given
      const updateRequirementDeltas = data.requirementDeltas[0];
      spyOn(service.updatedRequirementDelta, 'next');

      // when
      service.updateRequirementDelta(updateRequirementDeltas);

      // then
      expect(service.updatedRequirementDelta.next).toHaveBeenCalled();
    });

    it('should fire deleted requirementDeltas event', () => {
      // given
      const deleteRequirementDeltas = data.requirementDeltas[0];
      spyOn(service.deletedRequirementDelta, 'next');

      // when
      service.deleteRequirementDelta(deleteRequirementDeltas);

      // then
      expect(service.deletedRequirementDelta.next).toHaveBeenCalled();
    });
  });
});
