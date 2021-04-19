import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';

import {ValueDataService} from './value-data.service';

describe('DimensionDataService', () => {
  let service: ValueDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ValueDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
