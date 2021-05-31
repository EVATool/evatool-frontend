import {Injectable} from '@angular/core';
import {LogService} from './log.service';
import {AnalysisDto} from '../dto/AnalysisDto';
import {Analysis} from '../model/Analysis';
import {AnalysisMapperService} from './mapper/analysis-mapper.service';
import {ImpactMapperService} from './mapper/impact-mapper.service';
import {RequirementMapperService} from './mapper/requirement-mapper.service';
import {RequirementDeltaMapperService} from './mapper/requirement-delta-mapper.service';
import {StakeholderMapperService} from './mapper/stakeholder-mapper.service';
import {ValueMapperService} from './mapper/value-mapper.service';
import {VariantMapperService} from './mapper/variant-mapper.service';
import {Impact} from '../model/Impact';
import {ImpactDto} from '../dto/ImpactDto';
import {Value} from '../model/Value';
import {RequirementDelta} from '../model/RequirementDelta';
import {Requirement} from '../model/Requirement';
import {Stakeholder} from '../model/Stakeholder';
import {RequirementDto} from '../dto/RequirementDto';
import {RequirementDeltaDto} from '../dto/RequirementDeltaDto';
import {StakeholderDto} from '../dto/StakeholderDto';
import {ValueDto} from '../dto/ValueDto';
import {VariantDto} from '../dto/VariantDto';
import {Variant} from '../model/Variant';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SampleDataService {

  constructor(
    private logger: LogService,
    private analysisMapper: AnalysisMapperService,
    private impactMapper: ImpactMapperService,
    private requirementMapper: RequirementMapperService,
    private requirementDeltaMapper: RequirementDeltaMapperService,
    private stakeholderMapper: StakeholderMapperService,
    private valueMapper: ValueMapperService,
    private variantMapper: VariantMapperService) {

    if (!environment.testing) {
      return;
    }

    // Prepare Analysis Data.
    this.analysisDtoList.forEach((analysisDto: AnalysisDto) => {
      this.analyses.push(this.analysisMapper.fromDto(analysisDto));
    });

    // Prepare Stakeholder Data.
    this.stakeholderDtoList.forEach((stakeholderDto: StakeholderDto) => {
      this.stakeholders.push(this.stakeholderMapper.fromDto(stakeholderDto, this.analyses));
    });

    // Prepare Value Data.
    this.valueDtoList.forEach((valueDto: ValueDto) => {
      this.values.push(this.valueMapper.fromDto(valueDto, this.analyses));
    });

    // Prepare Variant Data.
    this.variantDtoList.forEach((variantDto: VariantDto) => {
      this.variants.push(this.variantMapper.fromDto(variantDto, this.analyses));
    });

    // Prepare Impact Data.
    this.impactDtoList.forEach((impactDto: ImpactDto) => {
      this.impacts.push(this.impactMapper.fromDto(impactDto, this.analyses, this.values, this.stakeholders));
    });

    // Prepare Requirement Data.
    this.requirementDtoList.forEach((requirementDto: RequirementDto) => {
      this.requirements.push(this.requirementMapper.fromDto(requirementDto, this.analyses, this.variants));
    });

    // Prepare Requirement Delta Data.
    this.requirementDeltaDtoList.forEach((requirementDeltaDto: RequirementDeltaDto) => {
      this.requirementDeltas.push(this.requirementDeltaMapper.fromDto(requirementDeltaDto, this.requirements, this.impacts));
    });
  }

  public readonly analyses: Analysis[] = [];
  public readonly analysisDtoList: AnalysisDto[] = [
    {
      id: '1',
      prefixSequenceId: 'ANA1',
      name: 'Analyse 1',
      description: 'Lorem Ipsum',
      isTemplate: false,
      imageUrl: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
      lastUpdated: '1379847549076'
    },
    {
      id: '2',
      prefixSequenceId: 'ANA2',
      name: 'Analyse 2',
      description: 'Lorem Ipsum',
      isTemplate: false,
      imageUrl: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
      lastUpdated: '1379847549076'
    },
    {
      id: '3',
      prefixSequenceId: 'ANA1',
      name: 'Template 1',
      description: 'Lorem Ipsum',
      isTemplate: true,
      imageUrl: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
      lastUpdated: '1379847549076'
    }
  ];

  public readonly impacts: Impact[] = [];
  public readonly impactDtoList: ImpactDto[] = [
    {
      id: '1',
      prefixSequenceId: 'IMP1',
      merit: 0.7,
      description: 'Lorem Ipsum',
      analysisId: '1',
      valueId: '1',
      stakeholderId: '1'
    },
    {
      id: '2',
      prefixSequenceId: 'IMP2',
      merit: 0.3,
      description: 'Lorem Ipsum',
      analysisId: '1',
      valueId: '2',
      stakeholderId: '2'
    },
    {
      id: '3',
      prefixSequenceId: 'IMP3',
      merit: -0.2,
      description: 'Lorem Ipsum',
      analysisId: '1',
      valueId: '1',
      stakeholderId: '2'
    }
  ];

  public readonly requirements: Requirement[] = [];
  public readonly requirementDtoList: RequirementDto[] = [
    {
      id: '1',
      prefixSequenceId: 'REQ1',
      description: 'Lorem Ipsum',
      analysisId: '1',
      variantIds: ['1', '3']
    },
    {
      id: '2',
      prefixSequenceId: 'REQ2',
      description: 'Lorem Ipsum',
      analysisId: '1',
      variantIds: ['1', '2']
    },
    {
      id: '3',
      prefixSequenceId: 'REQ3',
      description: 'Lorem Ipsum',
      analysisId: '1',
      variantIds: ['1', '2', '3']
    }
  ];

  public readonly requirementDeltas: RequirementDelta[] = [];
  public readonly requirementDeltaDtoList: RequirementDeltaDto[] = [
    {
      id: '1',
      overwriteMerit: 0.2,
      originalMerit: 0,
      meritColor: 0,
      analysisId: '1',
      requirementId: '1',
      impactId: '1'
    },
    {
      id: '2',
      overwriteMerit: 0.3,
      originalMerit: 0,
      meritColor: 0,
      analysisId: '1',
      requirementId: '1',
      impactId: '2'
    },
    {
      id: '3',
      overwriteMerit: -0.1,
      originalMerit: 0,
      meritColor: 0,
      analysisId: '1',
      requirementId: '1',
      impactId: '3'
    }
  ];

  public readonly stakeholders: Stakeholder[] = [];
  public readonly stakeholderDtoList: StakeholderDto[] = [
    {
      id: '1',
      prefixSequenceId: 'IND1',
      name: 'Retep Groß',
      priority: '2',
      level: 'INDIVIDUAL',
      impacted: 0.4,
      analysisId: '1'
    },
    {
      id: '2',
      prefixSequenceId: 'IND2',
      name: 'Leinad Lang',
      priority: '2',
      level: 'INDIVIDUAL',
      impacted: -0.7,
      analysisId: '1'
    }
  ];
  public readonly stakeholderPriorities: string[] = ['LOW', 'MEDIUM', 'HIGH', 'VERY HIGH'];
  public readonly stakeholderLevels: string[] = ['INDIVIDUAL', 'ORGANIZATION', 'SOCIETY'];

  public readonly values: Value[] = [];
  public readonly valueDtoList: ValueDto[] = [
    {
      id: '1',
      name: 'Moneeeeey',
      type: 'ECONOMIC',
      description: 'Lorem Ipsum',
      archived: false,
      analysisId: '1'
    },
    {
      id: '2',
      name: 'Edigg :DD',
      type: 'SOCIAL',
      description: 'Lorem Ipsum',
      archived: false,
      analysisId: '1'
    }
  ];
  public readonly valueTypes: string[] = ['SOCIAL', 'ECONOMIC'];

  public readonly variants: Variant[] = [];
  public readonly variantDtoList: VariantDto[] = [
    {
      id: '1',
      prefixSequenceId: 'VAR1',
      name: 'Accident',
      description: 'Lorem Ipsum',
      archived: false,
      analysisId: '1',
      subVariantIds: []
    },
    {
      id: '2',
      prefixSequenceId: 'VAR2',
      name: 'Some strange bugs',
      description: 'Lorem Ipsum',
      archived: false,
      analysisId: '1',
      subVariantIds: []
    },
    {
      id: '3',
      prefixSequenceId: 'VAR3',
      name: 'Multiple cases',
      description: 'Lorem Ipsum',
      archived: true,
      analysisId: '1',
      subVariantIds: []
    }
  ];
}
