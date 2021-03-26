import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ImpactDataService } from './impact-data.service';

describe('ImpactDataService', () => {
  let service: ImpactDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ImpactDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
