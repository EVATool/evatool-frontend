import {TestBed} from '@angular/core/testing';

import {ValueMapperService} from './value-mapper.service';

describe('ValueMapperService', () => {
  let service: ValueMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValueMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
