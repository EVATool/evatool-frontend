import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';

import {VariantsDataService} from './variants-data.service';
import {RouterTestingModule} from "@angular/router/testing";
import {RestMockProvidersVariants} from '../../../variant/services/spec/RestMockProviders';
import {SampleDataService} from '../spec/sample-data-service';

describe('VariantsDataService', () => {
  let service: VariantsDataService;
  let dataService: SampleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, RestMockProvidersVariants.imports],
      providers: RestMockProvidersVariants.providers
    });
    service = TestBed.inject(VariantsDataService);
    dataService = TestBed.inject(SampleDataService);
    dataService.setupVariants();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get Variants', () => {
    service.getVariants();
    expect(service.variantsSoureces.length).toBeGreaterThanOrEqual(2);
  });

  // it('update Variant', () => {
  //   service.variantsSoureces
  //   expect(service.variantsSoureces.length).toBeGreaterThanOrEqual(2);
  // });

});
