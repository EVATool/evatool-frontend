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

  it('should initialize', () => {
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
    const deletedValue = service.values[0];

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
    const defaultValue = service.createDefaultValue(data.analyses[0], data.valueTypes[0]);

    // then
    expect(defaultValue.id).toBeUndefined();
    expect(defaultValue.name).toEqual('');
    expect(defaultValue.valueType).toEqual(data.valueTypes[0]);
    expect(defaultValue.description).toEqual('');
    expect(defaultValue.archived).toEqual(false);
    expect(defaultValue.analysis).toBeDefined();
  });

  describe('event emitter', () => {
    it('should fire created values event', () => {
      // given
      const createValues = data.values[0];
      spyOn(service.createdValue, 'next');

      // when
      service.createValue(createValues);

      // then
      expect(service.createdValue.next).toHaveBeenCalled();
    });

    it('should fire updated values event', () => {
      // given
      const updateValues = data.values[0];
      spyOn(service.updatedValue, 'next');

      // when
      service.updateValue(updateValues);

      // then
      expect(service.updatedValue.next).toHaveBeenCalled();
    });

    it('should fire deleted values event', () => {
      // given
      const deleteValues = data.values[0];
      spyOn(service.deletedValue, 'next');

      // when
      service.deleteValue(deleteValues);

      // then
      expect(service.deletedValue.next).toHaveBeenCalled();
    });
  });
});
