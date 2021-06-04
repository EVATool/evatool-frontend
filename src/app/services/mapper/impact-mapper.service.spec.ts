import {TestBed} from '@angular/core/testing';

import {ImpactMapperService} from './impact-mapper.service';
import {SampleDataService} from '../sample-data.service';

describe('ImpactMapperService', () => {
  let service: ImpactMapperService;
  let data: SampleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpactMapperService);
    data = TestBed.inject(SampleDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should re-create entity', () => {
    // given
    const entity = data.impacts[0];

    // when
    const dto = service.toDto(entity);
    const recreatedEntity = service.fromDto(dto, data.analyses, data.values, data.stakeholders);

    // then
    expect(entity).toEqual(recreatedEntity);
  });
});
