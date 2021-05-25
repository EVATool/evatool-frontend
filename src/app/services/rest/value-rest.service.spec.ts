import { TestBed } from '@angular/core/testing';

import { ValueRestService } from './value-rest.service';
import {SpecService} from '../spec.service';

describe('ValueRestService', () => {
  let service: ValueRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(ValueRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
