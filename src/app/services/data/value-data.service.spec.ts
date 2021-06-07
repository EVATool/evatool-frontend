import {TestBed} from '@angular/core/testing';

import {ValueDataService} from './value-data.service';
import {SpecService} from '../spec.service';
import {SampleDataService} from '../sample-data.service';
import {MasterService} from '../master.service';
import {Value} from '../../model/Value';

describe('ValueDataService', () => {
  let service: ValueDataService;
  let data: SampleDataService;
  let masterService: MasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(ValueDataService);
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

  it('should create value', () => {
    // given
    const createValue = data.values[0];

    // then
    service.createdValue.subscribe((value: Value) => {
      expect(service.values).toContain(value);
    });

    // when
    service.createValue(createValue);
  });

  it('should update value', () => {
    // given
    const updatedValue = data.values[0];

    // then
    service.updatedValue.subscribe((value: Value) => {
      expect(updatedValue).toEqual(value);
    });

    // when
    updatedValue.archived = !updatedValue.archived;
    service.updateValue(updatedValue);
  });

  it('should delete value', () => {
    // given
    const deletedValue = service.values[0]; // TODO why does this test fail if the service. is replaced with data.

    // then
    service.deletedValue.subscribe((value: Value) => {
      expect(service.values).not.toContain(value);
    });

    // when
    service.deleteValue(deletedValue);
  });

  it('should create a default value', () => {
    // given

    // when
    const defaultValue = service.createDefaultValue(data.analyses[0]);

    // then
    expect(defaultValue.id).toBeUndefined();
    expect(defaultValue.name).toEqual('');
    expect(defaultValue.type).toEqual(service.valueTypes[0]);
    expect(defaultValue.description).toEqual('');
    expect(defaultValue.archived).toEqual(false);
    expect(defaultValue.analysis).toBeDefined();
  });

  describe('event emitter', () => {
    it('should fire created values event', () => {
      // given
      const createValues = data.values[0];
      spyOn(service.createdValue, 'emit');

      // when
      service.createValue(createValues);

      // then
      expect(service.createdValue.emit).toHaveBeenCalled();
    });

    it('should fire updated values event', () => {
      // given
      const updateValues = data.values[0];
      spyOn(service.updatedValue, 'emit');

      // when
      service.updateValue(updateValues);

      // then
      expect(service.updatedValue.emit).toHaveBeenCalled();
    });

    it('should fire deleted values event', () => {
      // given
      const deleteValues = data.values[0];
      spyOn(service.deletedValue, 'emit');

      // when
      service.deleteValue(deleteValues);

      // then
      expect(service.deletedValue.emit).toHaveBeenCalled();
    });

    // TODO Values types loaded event.
  });
});
