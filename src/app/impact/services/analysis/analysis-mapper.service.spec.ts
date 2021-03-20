import { SampleDataGenerator } from '../../spec/sample-data.service';
import { TestBed } from '@angular/core/testing';
import { AnalysisMapperService } from './analysis-mapper.service';

describe('AnalysisMapperService', () => {
  let service: AnalysisMapperService;
  let data: SampleDataGenerator;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SampleDataGenerator]
    });
    service = TestBed.inject(AnalysisMapperService);
    data = TestBed.inject(SampleDataGenerator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert to dto', () => {
    // given
    const analysis = data.getDummyAnalysis();

    // when
    const analysisDto = service.toDto(analysis);

    // then
    expect(analysis.id === analysisDto.rootEntityID).toBeTruthy();
  });

  it('should convert from dto', () => {
    // given
    const analysisDto = data.getDummyAnalysisDto();

    // when
    const analysis = service.fromDto(analysisDto);

    // then
    expect(analysis.id === analysisDto.rootEntityID).toBeTruthy();
  });

  it('should convert to impact dto', () => {
    // given
    const analysis = data.getDummyAnalysis();

    // when
    const analysisDto = service.toImpactDto(analysis);

    // then
    expect(analysis.id === analysisDto.id).toBeTruthy();
  });

  it('should convert from impact dto', () => {
    // given
    const analysisDto = data.getDummyImpactAnalysisDto();

    // when
    const analysis = service.fromImpactDto(analysisDto);

    // then
    expect(analysis.id === analysisDto.id).toBeTruthy();
  });
});
