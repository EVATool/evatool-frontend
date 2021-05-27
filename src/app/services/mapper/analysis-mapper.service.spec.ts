import {TestBed} from '@angular/core/testing';

import {AnalysisMapperService} from './analysis-mapper.service';

describe('AnalysisMapperService', () => {
  let service: AnalysisMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalysisMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
