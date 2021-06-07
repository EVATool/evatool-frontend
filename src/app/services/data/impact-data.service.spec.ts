import {TestBed} from '@angular/core/testing';

import {ImpactDataService} from './impact-data.service';
import {SpecService} from '../spec.service';
import {SampleDataService} from '../sample-data.service';
import {ValueDataService} from './value-data.service';
import {StakeholderDataService} from './stakeholder-data.service';

describe('ImpactDataService', () => {
  let service: ImpactDataService;
  let valueData: ValueDataService;
  let stakeholderData: StakeholderDataService;
  let data: SampleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(ImpactDataService);
    service.init();
    data = TestBed.inject(SampleDataService);

    valueData = TestBed.inject(ValueDataService);
    valueData.init();
    stakeholderData = TestBed.inject(StakeholderDataService);
    stakeholderData.init();
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
    spyOn(service.createdImpact, 'emit');

    // when
    service.createImpact(createImpact);

    // then
    expect(service.createdImpact.emit).toHaveBeenCalled();
    expect(service.impacts).toContain(createImpact);
  });

  it('should update impact', () => {
    // given
    const updateImpact = data.impacts[0];
    spyOn(service.updatedImpact, 'emit');

    // when
    service.updateImpact(updateImpact);

    // then
    expect(service.updatedImpact.emit).toHaveBeenCalled();
  });

  it('should delete impact', () => {
    // given
    const deleteImpact = data.impacts[0];
    spyOn(service.deletedImpact, 'emit');

    // when
    service.deleteImpact(deleteImpact);

    // then
    expect(service.deletedImpact.emit).toHaveBeenCalled();
    expect(service.impacts).not.toContain(deleteImpact);
  });

  it('should create a default impact', () => {
    // given

    // when
    const defaultImpact = service.createDefaultImpact(data.analyses[0], data.stakeholders[0], data.values[0]);

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
});
