import { TestBed } from '@angular/core/testing';

import { MockableService } from './mockable.service';

describe('MockableServiceService', () => {
  let service: MockableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
