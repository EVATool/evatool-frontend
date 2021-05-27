import {TestBed} from '@angular/core/testing';

import {RequirementRestService} from './requirement-rest.service';
import {SpecService} from '../spec.service';

describe('RequirementRestService', () => {
  let service: RequirementRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(RequirementRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
