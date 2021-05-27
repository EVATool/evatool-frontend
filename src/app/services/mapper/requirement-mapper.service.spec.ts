import {TestBed} from '@angular/core/testing';

import {RequirementMapperService} from './requirement-mapper.service';

describe('RequirementMapperService', () => {
  let service: RequirementMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequirementMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
