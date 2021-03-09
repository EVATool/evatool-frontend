import { TestBed } from '@angular/core/testing';

import { StakeholderRestService } from './stakeholder-rest.service';

describe('StakeholderRestService', () => {
  let service: StakeholderRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StakeholderRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
