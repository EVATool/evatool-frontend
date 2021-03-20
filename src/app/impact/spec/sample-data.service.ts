import { Injectable } from '@angular/core';
import { StakeholderMapperService } from '../services/stakeholder/stakeholder-mapper.service';
import { AnalysisMapperService } from '../services/analysis/analysis-mapper.service';
import { DimensionMapperService } from '../services/dimension/dimension-mapper.service';
import { Impact } from '../models/Impact';
import { ImpactDto } from '../dtos/ImpactDto';
import { StakeholderDto } from '../dtos/StakeholderDto';
import { Stakeholder } from '../models/Stakeholder';
import { Analysis } from '../models/Analysis';
import { AnalysisDto } from '../dtos/AnalysisDto';
import { DimensionDto } from '../dtos/DimensionDto';
import { Dimension } from '../models/Dimension';
import { ImpactStakeholderDto } from '../dtos/ImpactStakeholderDto';
import { ImpactAnalysisDto } from '../dtos/ImpactAnalysisDto';

@Injectable({
  providedIn: 'root'
})
export class SampleDataGenerator {

  constructor(
    private dimensionMapperService: DimensionMapperService,
    private stakeholderMapperService: StakeholderMapperService,
    private analysisMapperService: AnalysisMapperService) { }

  getDummyImpact(): Impact {
    const impact = new Impact();
    impact.id = 'imapctId';
    impact.value = 0.0;
    impact.description = 'imapctDescription';
    impact.dimension = this.getDummyDimension();
    impact.stakeholder = this.getDummyStakeholder();
    impact.analysis = this.getDummyAnalysis();
    return impact;
  }

  getDummyImpactDto(): ImpactDto {
    const impactDto = new ImpactDto();
    impactDto.id = 'imapctId';
    impactDto.value = 0.0;
    impactDto.description = 'imapctDescription';
    impactDto.dimension = this.getDummyDimensionDto();
    impactDto.stakeholder = this.getDummyImpactStakeholderDto();
    impactDto.analysis = this.getDummyImpactAnalysisDto();
    return impactDto;
  }

  getDummyImpactDtoWithMyChildren(dimension: Dimension, stakeholder: Stakeholder, analysis: Analysis): ImpactDto {
    const impactDto = new ImpactDto();
    impactDto.id = 'imapctId';
    impactDto.value = 0.0;
    impactDto.description = 'imapctDescription';
    impactDto.dimension = this.dimensionMapperService.toDto(dimension);
    impactDto.stakeholder = this.stakeholderMapperService.toImpactDto(stakeholder);
    impactDto.analysis = this.analysisMapperService.toImpactDto(analysis);
    return impactDto;
  }

  getDummyDimension(): Dimension {
    const dimension = new Dimension();
    dimension.id = 'dimensionId';
    dimension.name = 'dimensionName';
    dimension.type = 'dimensionType';
    dimension.description = 'dimensionDescription';
    return dimension;
  }

  getDummyDimensionDto(): DimensionDto {
    const dimensionDto = new DimensionDto();
    dimensionDto.id = 'dimensionId';
    dimensionDto.name = 'dimensionName';
    dimensionDto.type = 'dimensionType';
    dimensionDto.description = 'dimensionDescription';
    return dimensionDto;
  }

  getDummyStakeholder(): Stakeholder {
    const stakeholder = new Stakeholder();
    stakeholder.id = 'stakeholderId';
    stakeholder.name = 'stakeholderName';
    return stakeholder;
  }

  getDummyStakeholderDto(): StakeholderDto {
    const stakeholderDto = new StakeholderDto();
    stakeholderDto.rootEntityID = 'stakeholderId';
    return stakeholderDto;
  }

  getDummyImpactStakeholderDto(): ImpactStakeholderDto {
    const stakeholderDto = new ImpactStakeholderDto();
    stakeholderDto.id = 'stakeholderId';
    return stakeholderDto;
  }

  getDummyAnalysis(): Analysis {
    const analysis = new Analysis();
    analysis.id = 'analysisId';
    return analysis;
  }

  getDummyAnalysisDto(): AnalysisDto {
    const analysisDto = new AnalysisDto();
    analysisDto.rootEntityID = 'analysisId';
    return analysisDto;
  }

  getDummyImpactAnalysisDto(): ImpactAnalysisDto {
    const analysisDto = new ImpactAnalysisDto();
    analysisDto.id = 'analysisId';
    return analysisDto;
  }
}
