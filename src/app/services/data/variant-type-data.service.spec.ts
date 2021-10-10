import { TestBed } from '@angular/core/testing';

import { VariantTypeDataService } from './variant-type-data.service';

describe('VariantTypeDataService', () => {
  let service: VariantTypeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariantTypeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
