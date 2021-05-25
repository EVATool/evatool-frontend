import { TestBed } from '@angular/core/testing';

import { RequirementRestService } from './requirement-rest.service';

describe('RequirementRestService', () => {
  let service: RequirementRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequirementRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
