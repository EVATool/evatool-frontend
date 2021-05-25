import { TestBed } from '@angular/core/testing';

import { StakeholderRestService } from './stakeholder-rest.service';
import {SpecService} from '../spec.service';

describe('StakeholderRestService', () => {
  let service: StakeholderRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(StakeholderRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
