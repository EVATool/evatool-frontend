import {TestBed} from '@angular/core/testing';

import {AnalysisDataService} from './analysis-data.service';
import {SpecService} from '../spec.service';

describe('AnalysisDataService', () => {
  let service: AnalysisDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(AnalysisDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
