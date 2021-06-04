import {TestBed} from '@angular/core/testing';

import {ValueMapperService} from './value-mapper.service';
import {SampleDataService} from '../sample-data.service';

describe('ValueMapperService', () => {
  let service: ValueMapperService;
  let data: SampleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValueMapperService);
    data = TestBed.inject(SampleDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should re-create entity', () => {
    // given
    const entity = data.values[0];

    // when
    const dto = service.toDto(entity);
    const recreatedEntity = service.fromDto(dto, data.analyses);

    // then
    expect(entity).toEqual(recreatedEntity);
  });
});
