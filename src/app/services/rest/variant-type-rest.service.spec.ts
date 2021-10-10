import {TestBed} from '@angular/core/testing';

import {VariantTypeRestService} from './variant-type-rest.service';
import {SpecService} from '../spec.service';

describe('VariantTypeRestService', () => {
  let service: VariantTypeRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(VariantTypeRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
