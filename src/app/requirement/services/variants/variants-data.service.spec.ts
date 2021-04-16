import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';

import {VariantsDataService} from './variants-data.service';
import {RouterTestingModule} from "@angular/router/testing";

describe('VariantsDataService', () => {
  let service: VariantsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule]
    });
    service = TestBed.inject(VariantsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
