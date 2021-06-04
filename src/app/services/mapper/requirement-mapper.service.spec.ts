import {TestBed} from '@angular/core/testing';

import {RequirementMapperService} from './requirement-mapper.service';
import {SampleDataService} from '../sample-data.service';

describe('RequirementMapperService', () => {
  let service: RequirementMapperService;
  let data: SampleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequirementMapperService);
    data = TestBed.inject(SampleDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should re-create entity', () => {
    // given
    const entity = data.requirements[0];

    // when
    const dto = service.toDto(entity);
    const recreatedEntity = service.fromDto(dto, data.analyses, data.variants);

    // then
    expect(entity).toEqual(recreatedEntity);
  });
});
