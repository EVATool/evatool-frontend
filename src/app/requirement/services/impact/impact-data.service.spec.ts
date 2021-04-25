import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';

import {ImpactDataService} from './impact-data.service';
import {SampleDataService} from '../spec/sample-data-service';
import {RestMock} from '../../../impact/spec/RestMock';

describe('ImpactDataService', () => {
  let service: ImpactDataService;
  let data: SampleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RestMock.imports],
      providers: RestMock.providers
    });
    data = TestBed.inject(SampleDataService);
    service = TestBed.inject(ImpactDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create impact', () => {
    for (let i = 0; i < 10; i++){
      service.createImpact();
    }
    expect(service.impacts.length).toBeGreaterThanOrEqual(data.dummyImpacts.length);
  });

  it('should get impacts', () => {
    for (let i = 0; i < 10; i++){
      service.createImpact();
    }
    service.getImpacts();
    expect(service.impacts.length).toBeGreaterThanOrEqual(data.dummyImpacts.length);
  });
});
