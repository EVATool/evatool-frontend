import {TestBed} from '@angular/core/testing';

import {ImpactRestService} from './impact-rest.service';
import {SampleDataService} from '../spec/sample-data-service';
import {RestMock} from '../../../impact/spec/RestMock';

describe('ImpactRestService', () => {
  let service: ImpactRestService;
  let data: SampleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: RestMock.imports,
      providers: RestMock.providers});
    data = TestBed.inject(SampleDataService);
    service = TestBed.inject(ImpactRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
