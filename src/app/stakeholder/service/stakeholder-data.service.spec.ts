import {TestBed} from '@angular/core/testing';
import {StakeholderDataService} from './stakeholder-data.service';
import {StakeholderSampleDataService} from './spec/stakeholder-sample-data.service';
import {RestMockProvidersStakeholder} from './spec/RestMockProvidersStakeholder';

describe('StakeholderDataService', () => {
  let service: StakeholderDataService;
  let dataService: StakeholderSampleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: RestMockProvidersStakeholder.imports,
      providers: RestMockProvidersStakeholder.providers
    });
    service = TestBed.inject(StakeholderDataService);
    dataService = TestBed.inject(StakeholderSampleDataService);
    dataService.setup();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('load stakeholder', () => {
    service.loadStakeholder();
    expect(service.matDataSource.data.length).toBeGreaterThanOrEqual(3);
  });

  it('create default stakeholder', () => {
    service.createStakeholder();
    expect(service.matDataSource.data.length).toEqual(1);
  });

  it('create stakeholder', () => {
    service.save(dataService.getdummyStakeholder());
    expect(service.matDataSource.data.length).toEqual(3);
  });

  it('update stakeholder', () => {
    service.update(dataService.getdummyStakeholder());
  });

  it('delete stakeholder', () => {
    const oldSize = service.matDataSource.data.length + dataService.getdummyStakeholderDTOs().length;
    service.delete(dataService.getdummyStakeholder());
    expect(oldSize).toBeGreaterThanOrEqual(service.matDataSource.data.length);
  });
});
