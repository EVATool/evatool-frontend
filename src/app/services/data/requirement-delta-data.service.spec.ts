import { TestBed } from '@angular/core/testing';

import { RequirementDeltaDataService } from './requirement-delta-data.service';

describe('RequirementDeltaDataService', () => {
  let service: RequirementDeltaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequirementDeltaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
