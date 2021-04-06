import {Injectable, isDevMode} from '@angular/core';
import {StakeholderMapperService} from '../services/stakeholder/stakeholder-mapper.service';
import {AnalysisMapperService} from '../services/analysis/analysis-mapper.service';
import {ValueMapperService} from '../services/value/value-mapper.service';
import {Impact} from '../models/Impact';
import {ImpactDto} from '../dtos/ImpactDto';
import {StakeholderDto} from '../dtos/StakeholderDto';
import {Stakeholder} from '../models/Stakeholder';
import {Analysis} from '../models/Analysis';
import {AnalysisDto} from '../dtos/AnalysisDto';
import {ValueDto} from '../dtos/ValueDto';
import {Value} from '../models/Value';
import {ImpactStakeholderDto} from '../dtos/ImpactStakeholderDto';
import {ImpactAnalysisDto} from '../dtos/ImpactAnalysisDto';
import {ImpactMapperService} from "../services/impact/impact-mapper.service";
import {ImpactValueDto} from "../dtos/ImpactValueDto";

@Injectable({
  providedIn: 'root'
})
export class SampleDataService {

  public offline: boolean = true;

  constructor(
    private valueMapperService: ValueMapperService,
    private stakeholderMapperService: StakeholderMapperService,
    private analysisMapperService: AnalysisMapperService,
    private impactMapperService: ImpactMapperService) {

    this.offline &&= isDevMode(); // Production mode always makes real rest calls.

    this.dummyAnalysisDtos.forEach(dto => {
      this.dummyAnalyses.push(this.analysisMapperService.fromDto(dto));
    });

    this.dummyStakeholderDtos.forEach(dto => {
      this.dummyStakeholders.push(this.stakeholderMapperService.fromDto(dto));
    });

    this.dummyValueDtos.forEach(dto => {
      this.dummyValues.push(this.valueMapperService.fromDto(dto));
    });

    this.dummyImpactDtos.forEach(dto => {
      this.dummyImpacts.push(this.impactMapperService.fromDto(dto, this.dummyValues, this.dummyStakeholders, this.dummyAnalyses));
    });

    // TODO for requirements Dtos when they are in backend...
  }

  getDummyImpact(): Impact {
    return this.dummyImpacts[0];
  }

  getDummyImpactDto(): ImpactDto {
    return this.impactMapperService.toDto(this.getDummyImpact());
  }

  getDummyImpactDtoWithMyChildren(value: Value, stakeholder: Stakeholder, analysis: Analysis): ImpactDto {
    const impactDto = this.getDummyImpactDto();
    impactDto.valueEntity = this.valueMapperService.toImpactDto(value);
    impactDto.stakeholder = this.stakeholderMapperService.toImpactDto(stakeholder);
    impactDto.analysis = this.analysisMapperService.toImpactDto(analysis);
    return impactDto;
  }

  getDummyValue(): Value {
    return this.dummyValues[0];
  }

  getDummyValueDto(): ValueDto {
    return this.valueMapperService.toDto(this.getDummyValue());
  }

  getDummyImpactValueDto(): ImpactValueDto {
    return this.valueMapperService.toImpactDto(this.getDummyValue());
  }

  getDummyStakeholder(): Stakeholder {
    return this.dummyStakeholders[0];
  }

  getDummyStakeholderDto(): StakeholderDto {
    return this.stakeholderMapperService.toDto(this.getDummyStakeholder());
  }

  getDummyImpactStakeholderDto(): ImpactStakeholderDto {
    return this.stakeholderMapperService.toImpactDto(this.getDummyStakeholder());
  }

  getDummyAnalysis(): Analysis {
    return this.dummyAnalyses[0];
  }

  getDummyAnalysisDto(): AnalysisDto {
    return this.analysisMapperService.toDto(this.getDummyStakeholder());
  }

  getDummyImpactAnalysisDto(): ImpactAnalysisDto {
    return this.analysisMapperService.toImpactDto(this.getDummyStakeholder());
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

  readonly dummyAnalyses: Analysis[] = []

  readonly dummyStakeholderDtos: any[] = [
    {
      rootEntityID: '1', stakeholderName: 'Patient', stakeholderLevel: 'NATURAL_PERSON',
      analysis: {rootEntityID: 1}
    },
    {
      rootEntityID: '2', stakeholderName: 'Doctor', stakeholderLevel: 'NATURAL_PERSON',
      analysis: {rootEntityID: 1}
    },
    {
      rootEntityID: '3', stakeholderName: 'Family', stakeholderLevel: 'NATURAL_PERSON',
      analysis: {rootEntityID: 1}
    },
    {
      rootEntityID: '4', stakeholderName: 'Insurance', stakeholderLevel: 'NATURAL_PERSON',
      analysis: {rootEntityID: 1}
    }
  ];

  readonly dummyStakeholders: Stakeholder[] = []

  readonly dummyValueDtos: ValueDto[] = [
    {
      id: '1', name: 'Feelings', description: 'Feelings of Patient', type: 'SOCIAL',
      analysis: {rootEntityID: '1'}
    },
    {
      id: '2', name: 'Control', description: 'Control of Doctor', type: 'SOCIAL',
      analysis: {rootEntityID: '1'}
    },
    {
      id: '3', name: 'Finances', description: 'Economics of Family', type: 'ECONOMIC',
      analysis: {rootEntityID: '1'}
    },
    {
      id: '4', name: 'Safety', description: 'Lorem Ipsum', type: 'SOCIAL',
      analysis: {rootEntityID: '1'}
    },
    {
      id: '5', name: 'Care', description: 'Economics of Family', type: 'ECONOMIC',
      analysis: {rootEntityID: '1'}
    },
    {
      id: '6', name: 'Privacy', description: 'Economics of Family', type: 'ECONOMIC',
      analysis: {rootEntityID: '1'}
    },
    {
      id: '7', name: 'Self-Conception', description: 'Economics of Family', type: 'SOCIAL',
      analysis: {rootEntityID: '1'}
    },
    {
      id: '8', name: 'Participation', description: 'Economics of Family', type: 'SOCIAL',
      analysis: {rootEntityID: '1'}
    },
    {
      id: '9', name: 'Autonomy', description: 'Economics of Family', type: 'ECONOMIC',
      analysis: {rootEntityID: '1'}
    },
    {
      id: '10', name: 'Irgendwas', description: 'Economics of Family', type: 'SOCIAL',
      analysis: {rootEntityID: '1'}
    }
  ];

  readonly dummyValues: Value[] = []

  readonly dummyValueTypes: string[] = ['SOCIAL', 'ECONOMIC'];

  readonly dummyImpactDtos: any[] = [
    {
      id: '11111',
      uniqueString: 'IMP1',
      value: -0.3,
      description: 'This is the first read-only impact',
      valueEntity: {id: '1'},
      stakeholder: {id: '1'},
      analysis: {id: '1'}
    },
    {
      id: '22222',
      uniqueString: 'IMP2',
      value: 0.5,
      description: 'This is the second read-only impact',
      valueEntity: {id: '4'},
      stakeholder: {id: '1'},
      analysis: {id: '1'}
    },
    {
      id: '33333',
      uniqueString: 'IMP3',
      value: 0.9,
      description: 'This is the third read-only impact',
      valueEntity: {id: '2'},
      stakeholder: {id: '4'},
      analysis: {id: '1'}
    },
    {
      id: '44444',
      uniqueString: 'IMP4',
      value: 0.2,
      description: 'This is the fourth read-only impact',
      valueEntity: {id: '2'},
      stakeholder: {id: '3'},
      analysis: {id: '1'}
    }
  ];

  readonly dummyImpacts: Impact[] = [];
}
