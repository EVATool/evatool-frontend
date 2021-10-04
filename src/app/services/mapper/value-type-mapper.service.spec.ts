import { TestBed } from '@angular/core/testing';

import { ValueTypeMapperService } from './value-type-mapper.service';

describe('ValueTypeMapperService', () => {
  let service: ValueTypeMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValueTypeMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
