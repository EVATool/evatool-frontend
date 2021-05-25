import { TestBed } from '@angular/core/testing';

import { RequirementDeltaRestService } from './requirement-delta-rest.service';

describe('RequirementDeltaRestService', () => {
  let service: RequirementDeltaRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequirementDeltaRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
