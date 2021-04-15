import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';

import {DimensionRestService} from './dimension-rest.service';

describe('DimensionRestService', () => {
  let service: DimensionRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(DimensionRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
