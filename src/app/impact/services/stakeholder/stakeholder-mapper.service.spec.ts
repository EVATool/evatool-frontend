import { TestBed } from '@angular/core/testing';

import { StakeholderMapperService } from './stakeholder-mapper.service';

describe('StakeholderMapperService', () => {
  let service: StakeholderMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StakeholderMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
