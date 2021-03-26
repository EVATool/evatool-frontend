import { TestBed } from '@angular/core/testing';

import { ImpactRestService } from './impact-rest.service';

describe('ImpactRestService', () => {
  let service: ImpactRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpactRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
