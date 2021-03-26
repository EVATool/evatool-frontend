import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { RequirementsRestService } from './requirements-rest.service';

describe('RequirementsRestService', () => {
  let service: RequirementsRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(RequirementsRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
