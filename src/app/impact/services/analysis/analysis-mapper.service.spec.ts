import { SampleDataGenerator } from '../../spec/SampleDataGenerator';
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
    const analysis = SampleDataGenerator.getDummyAnalysis();

    // when
    const analysisDto = AnalysisMapperService.toDto(analysis);

    // then
    expect(analysis.id === analysisDto.rootEntityID).toBeTruthy();
  });

  it('should convert from dto', () => {
    // given
    const analysisDto = SampleDataGenerator.getDummyAnalysisDto();

    // when
    const analysis = AnalysisMapperService.fromDto(analysisDto);

    // then
    expect(analysis.id === analysisDto.rootEntityID).toBeTruthy();
  });

  it('should convert to impact dto', () => {
    // given
    const analysis = SampleDataGenerator.getDummyAnalysis();

    // when
    const analysisDto = AnalysisMapperService.toImpactDto(analysis);

    // then
    expect(analysis.id === analysisDto.id).toBeTruthy();
  });

  it('should convert from impact dto', () => {
    // given
    const analysisDto = SampleDataGenerator.getDummyImpactAnalysisDto();

    // when
    const analysis = AnalysisMapperService.fromImpactDto(analysisDto);

    // then
    expect(analysis.id === analysisDto.id).toBeTruthy();
  });
});
