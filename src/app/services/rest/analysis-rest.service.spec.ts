import {TestBed} from '@angular/core/testing';

import {AnalysisRestService} from './analysis-rest.service';
import {SpecService} from '../spec.service';

describe('AnalysisRestService', () => {
  let service: AnalysisRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports
    });
    service = TestBed.inject(AnalysisRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
