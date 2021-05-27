import {TestBed} from '@angular/core/testing';

import {RequirementDeltaMapperService} from './requirement-delta-mapper.service';

describe('RequirementDeltaMapperService', () => {
  let service: RequirementDeltaMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequirementDeltaMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
