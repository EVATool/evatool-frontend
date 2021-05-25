import { TestBed } from '@angular/core/testing';

import { RequirementDataService } from './requirement-data.service';

describe('RequirementDataService', () => {
  let service: RequirementDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequirementDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
