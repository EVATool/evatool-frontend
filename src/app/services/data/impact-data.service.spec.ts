import { TestBed } from '@angular/core/testing';

import { ImpactDataService } from './impact-data.service';
import {SpecService} from '../spec.service';

describe('ImpactDataService', () => {
  let service: ImpactDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(ImpactDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
