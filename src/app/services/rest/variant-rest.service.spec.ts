import { TestBed } from '@angular/core/testing';

import { VariantRestService } from './variant-rest.service';
import {SpecService} from '../spec.service';

describe('VariantRestService', () => {
  let service: VariantRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(VariantRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
