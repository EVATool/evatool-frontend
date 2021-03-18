import { SampleDataGenerator } from './../../spec/SampleDataGenerator';
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
    let dimension = SampleDataGenerator.getDummyDimension();
    let stakeholder = SampleDataGenerator.getDummyStakeholder();
    let analysis = SampleDataGenerator.getDummyAnalysis();
    let impactDto = SampleDataGenerator.getDummyImpactDtoWithMyChildren(dimension, stakeholder, analysis);

    // when
    let impact = ImpactMapperService.fromDto(impactDto, [dimension], [stakeholder], [analysis]);
    console.log("LOOOOOOOOOOOOOL");
    console.log(impact);
    console.log(impactDto);
    console.log(dimension);
    console.log(stakeholder);
    console.log(analysis);

    // then
    expect(impact.id === impactDto.id).toBeTruthy();
    expect(impact.value === impactDto.value).toBeTruthy();
    expect(impact.description === impactDto.description).toBeTruthy();

    expect(impact.dimension.id === impactDto.dimensionDto.id).toBeTruthy();
    expect(impact.stakeholder.id === impactDto.stakeholderDto.id).toBeTruthy();
    expect(impact.analysis.id === impactDto.analysisDto.id).toBeTruthy();
  });
});
