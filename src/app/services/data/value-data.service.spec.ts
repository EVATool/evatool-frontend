import {TestBed} from '@angular/core/testing';

import {ValueDataService} from './value-data.service';
import {SpecService} from '../spec.service';
import {SampleDataService} from '../sample-data.service';
import {MasterService} from '../master.service';

describe('ValueDataService', () => {
  let service: ValueDataService;
  let data: SampleDataService;
  let masterService: MasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(ValueDataService);
    data = TestBed.inject(SampleDataService);
    masterService = TestBed.inject(MasterService);
    masterService.init();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
