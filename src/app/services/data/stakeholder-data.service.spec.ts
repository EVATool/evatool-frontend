import { TestBed } from '@angular/core/testing';

import { StakeholderDataService } from './stakeholder-data.service';
import {SpecService} from '../spec.service';

describe('StakeholderDataService', () => {
  let service: StakeholderDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(StakeholderDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
