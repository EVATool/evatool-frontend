import { TestBed } from '@angular/core/testing';

import { RequirementDataService } from './requirement-data.service';
import {SpecService} from '../spec.service';

describe('RequirementDataService', () => {
  let service: RequirementDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(RequirementDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
