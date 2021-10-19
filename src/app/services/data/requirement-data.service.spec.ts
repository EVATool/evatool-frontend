import {TestBed} from '@angular/core/testing';

import {RequirementDataService} from './requirement-data.service';
import {SpecService} from '../spec.service';
import {SampleDataService} from '../sample-data.service';
import {MasterService} from '../master.service';
import {Requirement} from '../../model/Requirement';

describe('RequirementDataService', () => {
  let service: RequirementDataService;
  let data: SampleDataService;
  let masterService: MasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(RequirementDataService);
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

  it('should create requirement', () => {
    // given
    const createRequirement = data.requirements[0];

    // then
    service.createdRequirement.subscribe((requirement: Requirement) => {
      expect(service.requirements).toContain(requirement);
    });

    // when
    service.createRequirement(createRequirement);
  });

  it('should update requirement', () => {
    // given
    const updatedRequirement = data.requirements[0];

    // then
    service.updatedRequirement.subscribe((requirement: Requirement) => {
      expect(updatedRequirement).toEqual(requirement);
    });

    // when
    updatedRequirement.description = 'updated';
    service.updateRequirement(updatedRequirement);
  });

  it('should delete requirement', () => {
    // given
    const deletedRequirement = service.requirements[0];

    // then
    service.deletedRequirement.subscribe((requirement: Requirement) => {
      expect(service.requirements).not.toContain(requirement);
    });

    // when
    service.deleteRequirement(deletedRequirement);
  });

  it('should create a default requirement', () => {
    // given

    // when
    const defaultRequirement = service.createDefaultRequirement(data.analyses[0]);

    // then
    expect(defaultRequirement.id).toBeUndefined();
    expect(defaultRequirement.prefixSequenceId).toBeUndefined();
    expect(defaultRequirement.description).toEqual('');
    expect(defaultRequirement.analysis).toBeDefined();
    expect(defaultRequirement.variants.length).toEqual(0);
  });

  describe('event emitter', () => {
    it('should fire created requirements event', () => {
      // given
      const createRequirements = data.requirements[0];
      spyOn(service.createdRequirement, 'next');

      // when
      service.createRequirement(createRequirements);

      // then
      expect(service.createdRequirement.next).toHaveBeenCalled();
    });

    it('should fire updated requirements event', () => {
      // given
      const updateRequirements = data.requirements[0];
      spyOn(service.updatedRequirement, 'next');

      // when
      service.updateRequirement(updateRequirements);

      // then
      expect(service.updatedRequirement.next).toHaveBeenCalled();
    });

    it('should fire deleted requirements event', () => {
      // given
      const deleteRequirements = data.requirements[0];
      spyOn(service.deletedRequirement, 'next');

      // when
      service.deleteRequirement(deleteRequirements);

      // then
      expect(service.deletedRequirement.next).toHaveBeenCalled();
    });
  });
});
