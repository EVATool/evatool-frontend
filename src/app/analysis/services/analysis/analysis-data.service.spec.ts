import { TestBed } from '@angular/core/testing';

import { AnalysisDataService } from './analysis-data.service';

describe('AnalysisDataService', () => {
  let service: AnalysisDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalysisDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
