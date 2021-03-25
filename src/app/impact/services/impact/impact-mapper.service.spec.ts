import { SampleDataGenerator } from '../../spec/sample-data.service';
import { TestBed } from '@angular/core/testing';
import { ImpactMapperService } from './impact-mapper.service';

describe('ImpactMapperService', () => {
  let service: ImpactMapperService;
  let data: SampleDataGenerator;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SampleDataGenerator]
    });
    service = TestBed.inject(ImpactMapperService);
    data = TestBed.inject(SampleDataGenerator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert to dto', () => {
    // Arrange
    const impact = data.getDummyImpact();

    // Act
    const impactDto = service.toDto(impact);

    // Assert
    expect(impact.id === impactDto.id).toBeTruthy();
    expect(impact.uniqueString === impactDto.uniqueString).toBeTruthy();
    expect(impact.value === impactDto.value).toBeTruthy();
    expect(impact.description === impactDto.description).toBeTruthy();
  });

  it('should convert from dto', () => {
    // Arrange
    const dimension = data.getDummyDimension();
    const stakeholder = data.getDummyStakeholder();
    const analysis = data.getDummyAnalysis();
    const impactDto = data.getDummyImpactDtoWithMyChildren(dimension, stakeholder, analysis);

    // Act
    const impact = service.fromDto(impactDto, [dimension], [stakeholder], [analysis]);

    // Assert
    expect(impact.id === impactDto.id).toBeTruthy();
    expect(impact.uniqueString === impactDto.uniqueString).toBeTruthy();
    expect(impact.value === impactDto.value).toBeTruthy();
    expect(impact.description === impactDto.description).toBeTruthy();

    expect(impact.dimension.id === impactDto.dimension.id).toBeTruthy();
    expect(impact.stakeholder.id === impactDto.stakeholder.id).toBeTruthy();
    expect(impact.analysis.id === impactDto.analysis.id).toBeTruthy();
  });
});
