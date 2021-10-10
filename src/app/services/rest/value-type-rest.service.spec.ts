import { TestBed } from '@angular/core/testing';

import { ValueTypeRestService } from './value-type-rest.service';
import {SpecService} from '../spec.service';

describe('ValueTypeRestService', () => {
  let service: ValueTypeRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(ValueTypeRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
