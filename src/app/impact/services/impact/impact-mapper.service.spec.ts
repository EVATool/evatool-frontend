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
    // given
    const impact = data.getDummyImpact();

    // when
    const impactDto = service.toDto(impact);

    // then
    expect(impact.id === impactDto.id).toBeTruthy();
    expect(impact.uniqueString === impactDto.uniqueString).toBeTruthy();
    expect(impact.value === impactDto.value).toBeTruthy();
    expect(impact.description === impactDto.description).toBeTruthy();
  });

  it('should convert from dto', () => {
    // given
    const dimension = data.getDummyDimension();
    const stakeholder = data.getDummyStakeholder();
    const analysis = data.getDummyAnalysis();
    const impactDto = data.getDummyImpactDtoWithMyChildren(dimension, stakeholder, analysis);

    // when
    const impact = service.fromDto(impactDto, [dimension], [stakeholder], [analysis]);

    // then
    expect(impact.id === impactDto.id).toBeTruthy();
    expect(impact.uniqueString === impactDto.uniqueString).toBeTruthy();
    expect(impact.value === impactDto.value).toBeTruthy();
    expect(impact.description === impactDto.description).toBeTruthy();

    expect(impact.dimension.id === impactDto.dimension.id).toBeTruthy();
    expect(impact.stakeholder.id === impactDto.stakeholder.id).toBeTruthy();
    expect(impact.analysis.id === impactDto.analysis.id).toBeTruthy();
  });
});
