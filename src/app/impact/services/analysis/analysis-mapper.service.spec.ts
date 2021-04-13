import { SampleDataService } from '../../spec/sample-data.service';
import { TestBed } from '@angular/core/testing';
import { AnalysisMapperService } from './analysis-mapper.service';

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

  it('should convert to dto', () => {
    // Arrange
    const analysis = data.getDummyAnalysis();

    // Act
    const analysisDto = service.toDto(analysis);

    // Assert
    expect(analysis.equalsDto(analysisDto)).toBeTruthy();
  });

  it('should convert from dto', () => {
    // Arrange
    const analysisDto = data.getDummyAnalysisDto();

    // Act
    const analysis = service.fromDto(analysisDto);

    // Assert
    expect(analysis.equalsDto(analysisDto)).toBeTruthy();
  });

  it('should convert to impact dto', () => {
    // Arrange
    const analysis = data.getDummyAnalysis();

    // Act
    const analysisDto = service.toImpactDto(analysis);

    // Assert
    expect(analysis.equalsImpactDto(analysisDto)).toBeTruthy();
  });

  it('should convert from impact dto', () => {
    // Arrange
    const analysisDto = data.getDummyImpactAnalysisDto();

    // Act
    const analysis = service.fromImpactDto(analysisDto);

    // Assert
    expect(analysis.equalsImpactDto(analysisDto)).toBeTruthy();
  });
});
