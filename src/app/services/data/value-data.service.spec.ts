import {TestBed} from '@angular/core/testing';

import {ValueDataService} from './value-data.service';
import {SpecService} from '../spec.service';

describe('ValueDataService', () => {
  let service: ValueDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(ValueDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
