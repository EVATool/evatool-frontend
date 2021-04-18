import {TestBed} from '@angular/core/testing';

import {RequirementsDataService} from './requirements-data.service';
import {SampleDataService} from '../spec/sample-data-service';
import {RestMockProvidersRequirements} from '../spec/RestMockProviders';

describe('RequirementsDataService', () => {
  let service: RequirementsDataService;
  let dataService: SampleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: RestMockProvidersRequirements.imports,
      providers: RestMockProvidersRequirements.providers
      // imports: [HttpClientModule, RouterTestingModule]
    });
    service = TestBed.inject(RequirementsDataService);
    dataService = TestBed.inject(SampleDataService);
    dataService.setup();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('load Requirements', () => {
    service.loadRequirements();
    expect(service.requirements.length).toBeGreaterThanOrEqual(3);
  });

  it('create default Requirement', () => {
    const oldsize = service.matDataSource.data.length;
    service.createRequirementt();
    expect(service.matDataSource.data.length).toBeGreaterThan(oldsize);
  });

  it('delete Requirement', () => {
    const oldsize = service.getMatDataSource().data.length;
    service.deleteRequirement(dataService.getDummyRequirement());
    expect(oldsize).toBeLessThan(service.getMatDataSource().data.length);

  });

});
