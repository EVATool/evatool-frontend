import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';

import {DimensionDataService} from './dimension-data.service';

describe('DimensionDataService', () => {
  let service: DimensionDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(DimensionDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
