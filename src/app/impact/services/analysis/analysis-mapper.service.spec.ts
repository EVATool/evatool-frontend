import { AnalysisDto } from './../../dtos/AnalysisDto';
import { Analysis } from './../../models/Analysis';
import { TestBed } from '@angular/core/testing';

import { AnalysisMapperService } from './analysis-mapper.service';

describe('AnalysisMapperService', () => {
  let service: AnalysisMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalysisMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert to dto', () => {
    // given
    let analysis = new Analysis();
    analysis.id = 'id';

    // when
    let analysisDto = AnalysisMapperService.toDto(analysis);

    // then
    expect(analysis.id === analysisDto.id).toBeTruthy();
  });

  it('should convert from dto', () => {
    // given
    let analysisDto = new AnalysisDto();
    analysisDto.id = 'id';

    // when
    let analysis = AnalysisMapperService.fromDto(analysisDto);

    // then
    expect(analysis.id === analysisDto.id).toBeTruthy();
  });
});
