import {TestBed} from '@angular/core/testing';

import {RequirementDeltaMapperService} from './requirement-delta-mapper.service';
import {SampleDataService} from '../sample-data.service';

describe('RequirementDeltaMapperService', () => {
  let service: RequirementDeltaMapperService;
  let data: SampleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequirementDeltaMapperService);
    data = TestBed.inject(SampleDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should re-create entity', () => {
    // given
    const entity = data.requirementDeltas[0];

    // when
    const dto = service.toDto(entity);
    const recreatedEntity = service.fromDto(dto, data.requirements, data.impacts);

    // then
    expect(entity).toEqual(recreatedEntity);
  });
});
