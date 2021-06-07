import {TestBed} from '@angular/core/testing';

import {StakeholderDataService} from './stakeholder-data.service';
import {SpecService} from '../spec.service';
import {Stakeholder} from '../../model/Stakeholder';
import {SampleDataService} from '../sample-data.service';
import {MasterService} from '../master.service';
import {Analysis} from '../../model/Analysis';

describe('StakeholderDataService', () => {
  let service: StakeholderDataService;
  let data: SampleDataService;
  let masterService: MasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(StakeholderDataService);
    data = TestBed.inject(SampleDataService);
    masterService = TestBed.inject(MasterService);
    masterService.init();
    masterService.analysisData.changeCurrentAnalysis('1');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should initialize', () => { // TODO
    // given

    // when

    // then

  });

  it('should create stakeholder', () => {
    // given
    const createStakeholder = data.stakeholders[0];

    // then
    service.createdStakeholder.subscribe((stakeholder: Stakeholder) => {
      expect(service.stakeholders).toContain(stakeholder);
    });

    // when
    service.createStakeholder(createStakeholder);
  });

  it('should update stakeholder', () => {
    // given
    const updatedStakeholder = data.stakeholders[0];

    // then
    service.updatedStakeholder.subscribe((stakeholder: Stakeholder) => {
      expect(updatedStakeholder).toEqual(stakeholder);
    });

    // when
    updatedStakeholder.name = 'update';
    service.updateStakeholder(updatedStakeholder);
  });

  it('should delete stakeholder', () => {
    // given
    const deletedStakeholder = service.stakeholders[0]; // TODO why does this test fail if the service. is replaced with data.

    // then
    service.deletedStakeholder.subscribe((stakeholder: Stakeholder) => {
      expect(service.stakeholders).not.toContain(stakeholder);
    });

    // when
    service.deleteStakeholder(deletedStakeholder);
  });

  it('should create a default stakeholder', () => {
    // given

    // when
    const defaultStakeholder = service.createDefaultStakeholder(data.analyses[0]);

    // then
    expect(defaultStakeholder.id).toBeUndefined();
    expect(defaultStakeholder.prefixSequenceId).toBeUndefined();
    expect(defaultStakeholder.name).toEqual('');
    expect(defaultStakeholder.priority).toEqual(service.stakeholderPriorities[0]);
    expect(defaultStakeholder.level).toEqual(service.stakeholderLevels[0]);
    expect(defaultStakeholder.impacted).toBeNull();
    expect(defaultStakeholder.analysis).toBeDefined();
  });

  describe('event emitter', () => {
    it('should fire created stakeholders event', () => {
      // given
      const createStakeholders = data.stakeholders[0];
      spyOn(service.createdStakeholder, 'emit');

      // when
      service.createStakeholder(createStakeholders);

      // then
      expect(service.createdStakeholder.emit).toHaveBeenCalled();
    });

    it('should fire updated stakeholders event', () => {
      // given
      const updateStakeholders = data.stakeholders[0];
      spyOn(service.updatedStakeholder, 'emit');

      // when
      service.updateStakeholder(updateStakeholders);

      // then
      expect(service.updatedStakeholder.emit).toHaveBeenCalled();
    });

    it('should fire deleted stakeholders event', () => {
      // given
      const deleteStakeholders = data.stakeholders[0];
      spyOn(service.deletedStakeholder, 'emit');

      // when
      service.deleteStakeholder(deleteStakeholders);

      // then
      expect(service.deletedStakeholder.emit).toHaveBeenCalled();
    });

    // TODO Stakeholders types loaded event.
  });
});
