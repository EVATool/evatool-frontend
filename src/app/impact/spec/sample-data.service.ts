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
export class SampleDataService {

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

  readonly dummyAnalysisDtos: AnalysisDto[] = [
    {
      rootEntityID: '1'
    },
    {
      rootEntityID: '2'
    },
    {
      rootEntityID: '3'
    },
    {
      rootEntityID: '4'
    }
  ];

  readonly dummyStakeholderDtos: StakeholderDto[] = [
    {
      rootEntityID: '1', stakeholderName: 'Patient'
    },
    {
      rootEntityID: '2', stakeholderName: 'Doctor'
    },
    {
      rootEntityID: '3', stakeholderName: 'Family'
    },
    {
      rootEntityID: '4', stakeholderName: 'Ensurance'
    }
  ];

  readonly dummyDimensionDtos: DimensionDto[] = [
    {
      id: '1', name: 'Feelings', description: 'Feelings of Patient', type: 'SOCIAL'
    },
    {
      id: '2', name: 'Control', description: 'Control of Doctor', type: 'SOCIAL'
    },
    {
      id: '3', name: 'Finances', description: 'Economics of Family', type: 'ECONOMIC'
    },
    {
      id: '4', name: 'Safety', description: 'Lorem Ipsum', type: 'SOCIAL'
    },
    {
      id: '5', name: 'Care', description: 'Economics of Family', type: 'ECONOMIC'
    },
    {
      id: '6', name: 'Privacy', description: 'Economics of Family', type: 'ECONOMIC'
    },
    {
      id: '7', name: 'Self-Conception', description: 'Economics of Family', type: 'SOCIAL'
    },
    {
      id: '8', name: 'Participation', description: 'Economics of Family', type: 'SOCIAL'
    },
    {
      id: '9', name: 'Autonomy', description: 'Economics of Family', type: 'ECONOMIC'
    },
    {
      id: '10', name: 'Irgendwas', description: 'Economics of Family', type: 'SOCIAL'
    }
  ];

  readonly dummyDimensionTypes: string[] = ['SOCIAL', 'ECONOMIC'];

  readonly dummyImpactDtos: any[] = [
    {
      id: '11111',
      uniqueString: 'IMP1',
      value: -0.3,
      description: 'This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact ',
      dimension: { id: '1' },
      stakeholder: { id: '1' },
      analysis: { id: '1' }
    },
    {
      id: '22222',
      uniqueString: 'IMP2',
      value: 0.5,
      description: 'This is the second read-only impact',
      dimension: { id: '4' },
      stakeholder: { id: '1' },
      analysis: { id: '1' }
    },
    {
      id: '33333',
      uniqueString: 'IMP3',
      value: 0.9,
      description: 'This is the third read-only impact',
      dimension: { id: '2' },
      stakeholder: { id: '4' },
      analysis: { id: '1' }
    },
    {
      id: '44444',
      uniqueString: 'IMP4',
      value: 0.2,
      description: 'This is the fourth read-only impact',
      dimension: { id: '2' },
      stakeholder: { id: '3' },
      analysis: { id: '1' }
    }
  ];
}
