import { TestBed } from '@angular/core/testing';

import { ImpactDataService } from './impact-data.service';

describe('ImpactDataService', () => {
  let service: ImpactDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpactDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
