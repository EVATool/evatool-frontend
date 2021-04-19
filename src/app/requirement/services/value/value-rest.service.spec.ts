import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';

import {ValueRestService} from './value-rest.service';

describe('DimensionRestService', () => {
  let service: ValueRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ValueRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
