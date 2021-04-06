import {TestBed} from '@angular/core/testing';
import {VariantDataService} from './variant-data.service';
import {RestMockProvidersVariants} from './spec/RestMockProviders';
import {VariantSampleDataService} from './spec/sample-data.service';

describe('VariantDataService', () => {
  let service: VariantDataService;
  let dataService: VariantSampleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: RestMockProvidersVariants.imports,
      providers: RestMockProvidersVariants.providers
    });
    service = TestBed.inject(VariantDataService);
    dataService = TestBed.inject(VariantSampleDataService);
    dataService.setup();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('load Variants', () => {
    service.loadVariants();
    expect(service.variants.length).toBeGreaterThanOrEqual(3);
  });

  it('create default Variant', () => {
    const oldsize = service.matDataSource.data.length;
    service.createVariant();
    expect(service.matDataSource.data.length).toBeGreaterThan(oldsize);
  });

  it('update Variant', () => {
   service.archive(dataService.getDummyVariant());
   expect(service.matDataSource.data.length).toBe(2);
   expect(service.matDataSourceArchive.data.length).toBe(1);
  });

  it('delete Variant', () => {
    const oldsize = service.matDataSource.data.length;
    service.delete(dataService.getDummyVariant());
    expect(oldsize).toBeGreaterThan(service.matDataSource.data.length);

  });


});
