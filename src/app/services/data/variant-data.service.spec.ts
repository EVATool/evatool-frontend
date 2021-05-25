import { TestBed } from '@angular/core/testing';

import { VariantDataService } from './variant-data.service';

describe('VariantDataService', () => {
  let service: VariantDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariantDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
