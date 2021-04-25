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

  it('should load Requirements', () => {
    service.onInit();
    for (let i = 0; i < 3; i++){
      service.createRequirementt();
    }
    expect(service.requirements.length).toBeGreaterThanOrEqual(dataService.dummyRequirements.length);
  });

  it('should create new Requirement', () => {
    const oldsize = service.matDataSource.data.length;
    service.createRequirementt();
    expect(service.matDataSource.data.length).toBeGreaterThan(oldsize);
  });

  it('should delete Requirement', () => {
    const oldsize = service.getMatDataSource().data.length;
    service.deleteRequirement(dataService.getDummyRequirement());
    expect(oldsize).toBeLessThan(service.getMatDataSource().data.length + 1);

  });

  it('should update an Requirement', () => {
    service.onInit();
    service.createRequirementt();
    const updatetRequirement = service.requirements[0];
    updatetRequirement.rootEntityId = 1;
    service.updateRequirements(updatetRequirement);
    expect(service.requirements).toContain(updatetRequirement);
  });
});
