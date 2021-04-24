import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';

import {ValueDataService} from './value-data.service';
import {RestMock} from '../../../impact/spec/RestMock';
import {SampleDataService} from '../spec/sample-data-service';

describe('ValueDataService', () => {
  let service: ValueDataService;
  let data: SampleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RestMock.imports],
      providers: [RestMock.providers]
    });
    data = TestBed.inject(SampleDataService)
    service = TestBed.inject(ValueDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load values', () => {
    service.onInit();
    expect(service.values).toEqual(data.dummyValueDtos);
  });

  it('should create a value', () => {
    service.onInit();
    const existingValues = service.values.length;
    service.createValue(data.dummyValueDtos[0]);
    expect(service.values.length).toBe(existingValues + 1);
  });

  it('should update a value', () => {
    service.onInit();
    const updateValue = service.values[0];
    updateValue.valueTitle = 'New title';
    service.updateValue(updateValue);
    expect(service.values).toContain(updateValue);
  });

  it('should delete Value', () => {
    service.onInit();
    const exisitingValues = service.values.length;
    const deleteValue = service.values[0];
    service.deleteValue(deleteValue);
    expect(service.values.length).toBe(exisitingValues - 1);
  });
});
