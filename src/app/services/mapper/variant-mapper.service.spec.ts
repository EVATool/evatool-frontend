import {TestBed} from '@angular/core/testing';

import {VariantMapperService} from './variant-mapper.service';
import {SampleDataService} from '../sample-data.service';

describe('VariantMapperService', () => {
  let service: VariantMapperService;
  let data: SampleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariantMapperService);
    data = TestBed.inject(SampleDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should re-create entity', () => {
    // given
    const entity = data.variants[0];

    // when
    const dto = service.toDto(entity);
    const recreatedEntity = service.fromDto(dto, data.analyses);

    // then
    expect(entity).toEqual(recreatedEntity);
  });
});
