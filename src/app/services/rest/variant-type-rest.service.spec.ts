import { TestBed } from '@angular/core/testing';

import { VariantTypeRestService } from './variant-type-rest.service';

describe('VariantTypeRestService', () => {
  let service: VariantTypeRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariantTypeRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
