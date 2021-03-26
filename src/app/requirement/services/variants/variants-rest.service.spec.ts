import { TestBed } from '@angular/core/testing';

import { VariantsRestService } from './variants-rest.service';

describe('VariantsRestService', () => {
  let service: VariantsRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariantsRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
