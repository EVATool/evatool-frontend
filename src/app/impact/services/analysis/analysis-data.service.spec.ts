import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AnalysisDataService } from './analysis-data.service';

describe('AnalysisDataService', () => {
  let service: AnalysisDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule]
    });
    service = TestBed.inject(AnalysisDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
