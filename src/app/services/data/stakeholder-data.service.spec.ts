import { TestBed } from '@angular/core/testing';

import { StakeholderDataService } from './stakeholder-data.service';

describe('StakeholderDataService', () => {
  let service: StakeholderDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StakeholderDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
