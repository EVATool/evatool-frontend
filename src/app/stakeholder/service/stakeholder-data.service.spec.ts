import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { StakeholderDataService } from './stakeholder-data.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('StakeholderDataService', () => {
  let service: StakeholderDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule]
    });
    service = TestBed.inject(StakeholderDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
