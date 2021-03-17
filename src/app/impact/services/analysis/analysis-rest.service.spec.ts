import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AnalysisRestService } from './analysis-rest.service';

describe('AnalysisRestService', () => {
  let service: AnalysisRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(AnalysisRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
