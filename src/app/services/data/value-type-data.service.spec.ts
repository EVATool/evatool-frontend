import { TestBed } from '@angular/core/testing';

import { ValueTypeDataService } from './value-type-data.service';

describe('ValueTypeDataService', () => {
  let service: ValueTypeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValueTypeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
