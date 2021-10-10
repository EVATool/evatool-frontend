import { TestBed } from '@angular/core/testing';

import { VariantTypeDataService } from './variant-type-data.service';
import {SpecService} from '../spec.service';

describe('VariantTypeDataService', () => {
  let service: VariantTypeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(VariantTypeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
