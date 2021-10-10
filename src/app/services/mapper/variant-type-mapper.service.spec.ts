import { TestBed } from '@angular/core/testing';

import { VariantTypeMapperService } from './variant-type-mapper.service';

describe('VariantTypeMapperService', () => {
  let service: VariantTypeMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariantTypeMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
