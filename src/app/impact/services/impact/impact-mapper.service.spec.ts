import { AnalysisMapperService } from './../analysis/analysis-mapper.service';
import { StakeholderMapperService } from './../stakeholder/stakeholder-mapper.service';
import { DimensionMapperService } from './../dimension/dimension-mapper.service';
import { ImpactDto } from './../../dtos/ImpactDto';
import { Impact } from './../../models/Impact';
import { TestBed } from '@angular/core/testing';

import { ImpactMapperService } from './impact-mapper.service';
import { Dimension } from '../../models/Dimension';
import { Stakeholder } from '../../models/Stakeholder';
import { Analysis } from '../../models/Analysis';

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
    let impact = new Impact();
    impact.id = 'id';
    impact.value = 0.0;
    impact.description = 'description';
    impact.dimension = new Dimension();
    impact.stakeholder = new Stakeholder();
    impact.analysis = new Analysis();

    // when
    let impactDto = ImpactMapperService.toDto(impact);

    // then
    expect(impact.id === impactDto.id).toBeTruthy();
    expect(impact.value === impactDto.value).toBeTruthy();
    expect(impact.description === impactDto.description).toBeTruthy();
  });

  it('should convert from dto', () => {
    // given
    let impactDto = new ImpactDto();
    impactDto.id = 'id';
    impactDto.value = 0.0;
    impactDto.description = 'description';

    let dimension = new Dimension();
    dimension.id = "dimensionId"; 
    impactDto.dimension = DimensionMapperService.toDto(dimension);

    let stakeholder = new Stakeholder();
    stakeholder.id = "stakeholderId"; 
    impactDto.stakeholder = StakeholderMapperService.toDto(stakeholder);

    let analysis = new Dimension();
    analysis.id = "analysisId"; 
    impactDto.analysis = AnalysisMapperService.toDto(analysis);

    // when
    let impact = ImpactMapperService.fromDto(impactDto, [dimension], [stakeholder], [analysis]);

    // then
    expect(impact.id === impactDto.id).toBeTruthy();
    expect(impact.value === impactDto.value).toBeTruthy();
    expect(impact.description === impactDto.description).toBeTruthy();

    expect(impact.dimension.id === impactDto.dimension.id).toBeTruthy();
    expect(impact.stakeholder.id === impactDto.stakeholder.id).toBeTruthy();
    expect(impact.analysis.id === impactDto.analysis.id).toBeTruthy();
  });
});
