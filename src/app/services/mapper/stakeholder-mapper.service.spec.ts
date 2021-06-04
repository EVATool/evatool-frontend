import {TestBed} from '@angular/core/testing';

import {StakeholderMapperService} from './stakeholder-mapper.service';
import {SampleDataService} from '../sample-data.service';

describe('StakeholderMapperService', () => {
  let service: StakeholderMapperService;
  let data: SampleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StakeholderMapperService);
    data = TestBed.inject(SampleDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should re-create entity', () => {
    // given
    const entity = data.stakeholders[0];

    // when
    const dto = service.toDto(entity);
    const recreatedEntity = service.fromDto(dto, data.analyses);

    // then
    expect(entity).toEqual(recreatedEntity);
  });
});
