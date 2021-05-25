import {TestBed} from '@angular/core/testing';

import {RequirementDeltaDataService} from './requirement-delta-data.service';
import {SpecService} from '../spec.service';

describe('RequirementDeltaDataService', () => {
  let service: RequirementDeltaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports
    });
    service = TestBed.inject(RequirementDeltaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
