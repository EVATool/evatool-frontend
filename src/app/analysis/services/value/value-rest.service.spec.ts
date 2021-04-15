import {HttpClientModule} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';

import {ValueRestService} from './value-rest.service';

describe('ValueRestService', () => {
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
