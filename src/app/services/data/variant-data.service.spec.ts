import { TestBed } from '@angular/core/testing';

import { VariantDataService } from './variant-data.service';
import {SpecService} from '../spec.service';

describe('VariantDataService', () => {
  let service: VariantDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(VariantDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
