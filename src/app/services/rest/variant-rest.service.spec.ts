import { TestBed } from '@angular/core/testing';

import { VariantRestService } from './variant-rest.service';

describe('VariantRestService', () => {
  let service: VariantRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariantRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
