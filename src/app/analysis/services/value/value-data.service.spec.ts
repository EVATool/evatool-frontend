import {HttpClientModule} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';

import {ValueDataService} from './value-data.service';
import {ValuesSampleDataService} from '../spec-values/values-sample-data.service';
import {RestMockProvidersValues} from '../spec-values/RestMockProvidersValues';

describe('ValueDataService', () => {
  let service: ValueDataService;
  let dataService: ValuesSampleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: RestMockProvidersValues.imports,
      providers: RestMockProvidersValues.providers
    });
    service = TestBed.inject(ValueDataService);
    dataService = TestBed.inject(ValuesSampleDataService);
    dataService.setup();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('load values', () => {
    service.loadValuesByAnalysisId('');
    expect(service.values.length).toBeGreaterThanOrEqual(3);
  });

  it('create value', () => {
    service.createValue(dataService.getDummyValue());
    expect(service.values.length).toBeGreaterThanOrEqual(1);
  });

  it('update value', () => {
    service.updateValue(dataService.getDummyValue());
  });

  it('delete value', () => {
    const oldSize = service.values.length;
    service.deleteValue(dataService.getDummyValue());
    expect(oldSize).toBeLessThanOrEqual(service.values.length);
  });
});
