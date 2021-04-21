import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';

import {ValueRestService} from './value-rest.service';
import {RestMock} from '../../../impact/spec/RestMock';
import {SampleDataService} from '../spec/sample-data-service';

describe('DimensionRestService', () => {
  let data: SampleDataService;
  let service: ValueRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: RestMock.imports,
      providers: RestMock.providers
    });

    data = TestBed.inject(SampleDataService);
    service = TestBed.inject(ValueRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get Values', () => {
    service.getValues();
    expect(service.getValues).toEqual(data.dummyValues);
  });
});
