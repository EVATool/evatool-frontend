import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';

import {VariantsDataService} from './variants-data.service';
import {RouterTestingModule} from '@angular/router/testing';
import {SampleDataService} from '../spec/sample-data-service';
import {RestMockProvidersRequirements} from "../spec/RestMockProviders";

describe('VariantsDataService', () => {
  let service: VariantsDataService;
  let dataService: SampleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, RestMockProvidersRequirements.imports],
      providers: RestMockProvidersRequirements.providers
    });
    service = TestBed.inject(VariantsDataService);
    dataService = TestBed.inject(SampleDataService);
    dataService.setupVariants();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load variants', () => {
    service.onInit();
    expect(service.variantsSoureces.length).toBeGreaterThanOrEqual(2);
  });
});
