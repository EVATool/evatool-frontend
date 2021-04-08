import { TestBed } from '@angular/core/testing';

import { MockableServiceService } from './mockable-service.service';

describe('MockableServiceService', () => {
  let service: MockableServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockableServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
