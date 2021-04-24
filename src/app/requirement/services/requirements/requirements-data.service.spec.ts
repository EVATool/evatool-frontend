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
    service.loadRequirements();
    expect(service.requirements.length).toBeGreaterThanOrEqual(3);
  });

  it('should create new Requirement', () => {
    const oldsize = service.matDataSource.data.length;
    service.createRequirementt();
    expect(service.matDataSource.data.length).toBeGreaterThan(oldsize);
  });

  it('should delete Requirement', () => {
    const oldsize = service.getMatDataSource().data.length;
    service.deleteRequirement(dataService.getDummyRequirement());
    expect(oldsize).toBeLessThan(service.getMatDataSource().data.length);

  });

  it('should update an Requirement', () => {
    service.onInit();
    const updatetRequirement = service.requirements[0];
    service.updateRequirements(updatetRequirement);
    expect(service.requirements).toContain(updatetRequirement);
  });

  it('should fire \'removedRequirement\' event', () => {
    spyOn(service.removedRequirement, 'emit');
    service.onInit();
    service.deleteRequirement(service.requirements[0]);
    expect(service.removedRequirement.emit).toHaveBeenCalled();
  });

  it('should fire \'changedRequirements\' event', () => {
    spyOn(service.changedRequirements, 'emit');
    service.onInit();
    service.updateRequirements(service.requirements[0]);
    expect(service.changedRequirements.emit).toHaveBeenCalled();
  });

  it('should fire \'loadedRequirement\' event', () => {
    spyOn(service.loadedRequirements, 'emit');
    service.onInit();
    expect(service.loadedRequirements.emit).toHaveBeenCalled();
  });

  it('should fire \'addedRequirement\' event', () => {
    spyOn(service.addedRequirement, 'emit');
    service.createRequirement(dataService.dummyRequirements[0].rootEntityId);
    expect(service.loadedRequirements.emit).toHaveBeenCalled();
  });
});
