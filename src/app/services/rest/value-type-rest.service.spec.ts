import { TestBed } from '@angular/core/testing';

import { ValueTypeRestService } from './value-type-rest.service';

describe('ValueTypeRestService', () => {
  let service: ValueTypeRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValueTypeRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
