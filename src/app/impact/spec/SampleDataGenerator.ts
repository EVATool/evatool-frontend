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
    impact.id = 'id';
    impact.value = 0.0;
    impact.description = 'description';
    impact.dimension = this.getDummyDimension();
    impact.stakeholder = this.getDummyStakeholder();
    impact.analysis = this.getDummyAnalysis();
    return impact;
  }

  static getDummyImpactDto(): ImpactDto {
    let impactDto = new ImpactDto();
    impactDto.id = 'id';
    impactDto.value = 0.0;
    impactDto.description = 'description';
    impactDto.dimension = this.getDummyDimensionDto();
    impactDto.stakeholder = this.getDummyStakeholderDto();
    impactDto.analysis = this.getDummyAnalysisDto();
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
    stakeholder.id = 'id';
    stakeholder.name = 'name';
    return stakeholder
  }

  static getDummyStakeholderDto(): StakeholderDto {
    let stakeholderDto = new StakeholderDto();
    stakeholderDto.id = 'id';
    stakeholderDto.name = 'name';
    return stakeholderDto;
  }

  static getDummyAnalysis(): Analysis {
    let analysis = new Analysis();
    analysis.id = 'analysisId';
    return analysis
  }

  static getDummyAnalysisDto(): AnalysisDto {
    let analysisDto = new AnalysisDto();
    analysisDto.id = 'analysisId';
    return analysisDto;
  }
}
