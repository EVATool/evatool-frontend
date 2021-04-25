import {TestBed} from '@angular/core/testing';

import {ValueRestService} from './value-rest.service';
import {RestMock} from '../../../impact/spec/RestMock';
import {SampleDataService} from '../spec/sample-data-service';

describe('ValueRestService', () => {
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
});
