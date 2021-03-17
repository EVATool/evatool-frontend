import { SampleDataGenerator } from './../../spec/SampleDataGenerator';
import { AnalysisMapperService } from './../analysis/analysis-mapper.service';
import { StakeholderMapperService } from './../stakeholder/stakeholder-mapper.service';
import { DimensionMapperService } from './../dimension/dimension-mapper.service';
import { TestBed } from '@angular/core/testing';
import { ImpactMapperService } from './impact-mapper.service';

describe('ImpactMapperService', () => {
  let service: ImpactMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpactMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert to dto', () => {
    // given
    let impact = SampleDataGenerator.getDummyImpact();

    // when
    let impactDto = ImpactMapperService.toDto(impact);

    // then
    expect(impact.id === impactDto.id).toBeTruthy();
    expect(impact.value === impactDto.value).toBeTruthy();
    expect(impact.description === impactDto.description).toBeTruthy();
  });

  it('should convert from dto', () => {
    // given
    let dimension = SampleDataGenerator.getDummyDimensionDto();
    let stakeholder = SampleDataGenerator.getDummyStakeholderDto();
    let analysis = SampleDataGenerator.getDummyAnalysisDto();
    let impactDto = SampleDataGenerator.getDummyImpactDtoWithMyChildren(dimension, stakeholder, analysis);

    // when
    let impact = ImpactMapperService.fromDto(impactDto, [dimension], [stakeholder], [analysis]);

    // then
    expect(impact.id === impactDto.id).toBeTruthy();
    expect(impact.value === impactDto.value).toBeTruthy();
    expect(impact.description === impactDto.description).toBeTruthy();

    expect(impact.dimension.id === impactDto.dimensionDto.id).toBeTruthy();
    expect(impact.stakeholder.id === impactDto.stakeholderDto.id).toBeTruthy();
    expect(impact.analysis.id === impactDto.analysisDto.id).toBeTruthy();
  });
});
