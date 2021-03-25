import { SampleDataGenerator } from '../../spec/sample-data.service';
import { TestBed } from '@angular/core/testing';
import { AnalysisMapperService } from './analysis-mapper.service';

describe('AnalysisMapperService', () => {
  let service: AnalysisMapperService;
  let data: SampleDataGenerator;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SampleDataGenerator]
    });
    service = TestBed.inject(AnalysisMapperService);
    data = TestBed.inject(SampleDataGenerator);
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
    expect(analysis.id === analysisDto.rootEntityID).toBeTruthy();
  });

  it('should convert from dto', () => {
    // Arrange
    const analysisDto = data.getDummyAnalysisDto();

    // Act
    const analysis = service.fromDto(analysisDto);

    // Assert
    expect(analysis.id === analysisDto.rootEntityID).toBeTruthy();
  });

  it('should convert to impact dto', () => {
    // Arrange
    const analysis = data.getDummyAnalysis();

    // Act
    const analysisDto = service.toImpactDto(analysis);

    // Assert
    expect(analysis.id === analysisDto.id).toBeTruthy();
  });

  it('should convert from impact dto', () => {
    // Arrange
    const analysisDto = data.getDummyImpactAnalysisDto();

    // Act
    const analysis = service.fromImpactDto(analysisDto);

    // Assert
    expect(analysis.id === analysisDto.id).toBeTruthy();
  });
});
