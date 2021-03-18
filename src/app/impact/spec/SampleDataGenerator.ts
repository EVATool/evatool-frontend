import { ImpactAnalysisDto } from './../dtos/ImpactAnalysisDto';
import { ImpactStakeholderDto } from './../dtos/ImpactStakeholderDto';
import { StakeholderMapperService } from './../services/stakeholder/stakeholder-mapper.service';
import { AnalysisMapperService } from './../services/analysis/analysis-mapper.service';
import { DimensionMapperService } from './../services/dimension/dimension-mapper.service';
import { Impact } from './../models/Impact';
import { ImpactDto } from './../dtos/ImpactDto';
import { StakeholderDto } from './../dtos/StakeholderDto';
import { Stakeholder } from './../models/Stakeholder';
import { Analysis } from './../models/Analysis';
import { AnalysisDto } from './../dtos/AnalysisDto';
import { DimensionDto } from './../dtos/DimensionDto';
import { Dimension } from './../models/Dimension';

export class SampleDataGenerator {

  static getDummyImpact(): Impact {
    let impact = new Impact();
    impact.id = 'imapctId';
    impact.value = 0.0;
    impact.description = 'imapctDescription';
    impact.dimension = this.getDummyDimension();
    impact.stakeholder = this.getDummyStakeholder();
    impact.analysis = this.getDummyAnalysis();
    return impact;
  }

  static getDummyImpactDto(): ImpactDto {
    let impactDto = new ImpactDto();
    impactDto.id = 'imapctId';
    impactDto.value = 0.0;
    impactDto.description = 'imapctDescription';
    impactDto.dimension = this.getDummyDimensionDto();
    impactDto.stakeholder = this.getDummyImpactStakeholderDto();
    impactDto.analysis = this.getDummyImpactAnalysisDto();
    return impactDto;
  }

  static getDummyImpactDtoWithMyChildren(dimension: Dimension, stakeholder: Stakeholder, analysis: Analysis): ImpactDto {
    let impactDto = new ImpactDto();
    impactDto.id = 'imapctId';
    impactDto.value = 0.0;
    impactDto.description = 'imapctDescription';
    impactDto.dimension = DimensionMapperService.toDto(dimension);
    impactDto.stakeholder = StakeholderMapperService.toImpactDto(stakeholder);
    impactDto.analysis = AnalysisMapperService.toImpactDto(analysis);
    return impactDto;
  }

  static getDummyDimension(): Dimension {
    let dimension = new Dimension();
    dimension.id = 'dimensionId';
    dimension.name = 'dimensionName';
    dimension.type = 'dimensionType';
    dimension.description = 'dimensionDescription';
    return dimension;
  }

  static getDummyDimensionDto(): DimensionDto {
    let dimensionDto = new DimensionDto();
    dimensionDto.id = 'dimensionId';
    dimensionDto.name = 'dimensionName';
    dimensionDto.type = 'dimensionType';
    dimensionDto.description = 'dimensionDescription';
    return dimensionDto;
  }

  static getDummyStakeholder(): Stakeholder {
    let stakeholder = new Stakeholder();
    stakeholder.id = 'stakeholderId';
    stakeholder.name = 'stakeholderName';
    return stakeholder
  }

  static getDummyStakeholderDto(): StakeholderDto {
    let stakeholderDto = new StakeholderDto();
    stakeholderDto.rootEntityID = 'stakeholderId';
    return stakeholderDto;
  }

  static getDummyImpactStakeholderDto(): ImpactStakeholderDto {
    let stakeholderDto = new ImpactStakeholderDto();
    stakeholderDto.id = 'stakeholderId';
    return stakeholderDto;
  }

  static getDummyAnalysis(): Analysis {
    let analysis = new Analysis();
    analysis.id = 'analysisId';
    return analysis
  }

  static getDummyAnalysisDto(): AnalysisDto {
    let analysisDto = new AnalysisDto();
    analysisDto.rootEntityID = 'analysisId';
    return analysisDto;
  }

  static getDummyImpactAnalysisDto(): ImpactAnalysisDto {
    let analysisDto = new ImpactAnalysisDto();
    analysisDto.id = 'analysisId';
    return analysisDto;
  }
}
