import {TestBed} from '@angular/core/testing';

import {ImpactRestService} from './impact-rest.service';
import {SpecService} from '../spec.service';

describe('ImpactRestService', () => {
  let service: ImpactRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(ImpactRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
