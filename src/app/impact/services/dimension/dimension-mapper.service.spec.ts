import { TestBed } from '@angular/core/testing';

import { DimensionMapperService } from './dimension-mapper.service';

describe('DimensionMapperService', () => {
  let service: DimensionMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DimensionMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
