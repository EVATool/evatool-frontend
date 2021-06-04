import {TestBed} from '@angular/core/testing';

import {AnalysisMapperService} from './analysis-mapper.service';
import {SampleDataService} from '../sample-data.service';

describe('AnalysisMapperService', () => {
  let service: AnalysisMapperService;
  let data: SampleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalysisMapperService);
    data = TestBed.inject(SampleDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should re-create entity', () => {
    // given
    const entity = data.analyses[0];

    // when
    const dto = service.toDto(entity);
    const recreatedEntity = service.fromDto(dto);

    // then
    expect(entity).toEqual(recreatedEntity);
  });
});
