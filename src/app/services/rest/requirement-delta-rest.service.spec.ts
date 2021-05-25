import {TestBed} from '@angular/core/testing';

import {RequirementDeltaRestService} from './requirement-delta-rest.service';
import {HttpClientModule} from '@angular/common/http';

describe('RequirementDeltaRestService', () => {
  let service: RequirementDeltaRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClientModule]
    });
    service = TestBed.inject(RequirementDeltaRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
