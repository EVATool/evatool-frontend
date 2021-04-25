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
    data = TestBed.inject(SampleDataService);
    service = TestBed.inject(ValueDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load values', () => {
    service.onInit();
    expect(service.values).toEqual(data.dummyValueDtos);
  });
});
