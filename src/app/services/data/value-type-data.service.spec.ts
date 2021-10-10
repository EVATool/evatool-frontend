import {TestBed} from '@angular/core/testing';

import {ValueTypeDataService} from './value-type-data.service';
import {SpecService} from '../spec.service';

describe('ValueTypeDataService', () => {
  let service: ValueTypeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(ValueTypeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
