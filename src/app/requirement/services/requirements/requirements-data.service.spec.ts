import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { RequirementsDataService } from './requirements-data.service';

describe('RequirementsDataService', () => {
  let service: RequirementsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(RequirementsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
