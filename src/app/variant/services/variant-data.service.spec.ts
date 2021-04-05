import {TestBed} from '@angular/core/testing';
import {VariantDataService} from './variant-data.service';
import {RestMockProvidersVariants} from './spec/RestMockProviders';
import {VariantSampleDataService} from './spec/sample-data.service';

describe('VariantDataService', () => {
  let service: VariantDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: RestMockProvidersVariants.imports,
      providers: RestMockProvidersVariants.providers
    });
    service = TestBed.inject(VariantDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('load Variants', () => {
    service.loadVariants();
    expect(service.variants.length).toBeGreaterThanOrEqual(1);
  });

  it('create default Variant', () => {
    // todo
  });

  it('update default Variant', () => {
    // todo
  });

  it('delete default Variant', () => {
    // todo
  });

  it('load analysisId from Router', () => {
    // todo
  });



});
