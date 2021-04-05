import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
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

  constructor(
    private valueMapperService: ValueMapperService,
    private stakeholderMapperService: StakeholderMapperService,
    private analysisMapperService: AnalysisMapperService,
    private impactMapperService: ImpactMapperService) {

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
    const impact = new Impact();
    impact.id = 'imapctId';
    impact.value = 0.0;
    impact.description = 'imapctDescription';
    impact.valueEntity = this.getDummyValue();
    impact.stakeholder = this.getDummyStakeholder();
    impact.analysis = this.getDummyAnalysis();
    return impact;
  }

  getDummyImpactDto(): ImpactDto {
    const impactDto = new ImpactDto();
    impactDto.id = 'imapctId';
    impactDto.value = 0.0;
    impactDto.description = 'imapctDescription';
    impactDto.valueEntity = this.getDummyImpactValueDto();
    impactDto.stakeholder = this.getDummyImpactStakeholderDto();
    impactDto.analysis = this.getDummyImpactAnalysisDto();
    return impactDto;
  }

  getDummyImpactDtoWithMyChildren(value: Value, stakeholder: Stakeholder, analysis: Analysis): ImpactDto {
    const impactDto = new ImpactDto();
    impactDto.id = 'impactId';
    impactDto.value = 0.0;
    impactDto.description = 'impactDescription';
    impactDto.valueEntity = this.valueMapperService.toImpactDto(value);
    impactDto.stakeholder = this.stakeholderMapperService.toImpactDto(stakeholder);
    impactDto.analysis = this.analysisMapperService.toImpactDto(analysis);
    return impactDto;
  }

  getDummyValue(): Value {
    const value = new Value();
    value.id = 'valueId';
    value.name = 'valueName';
    value.type = 'valueType';
    value.description = 'valueDescription';
    value.analysis = this.getDummyAnalysis();
    return value;
  }

  getDummyValueDto(): ValueDto {
    const valueDto = new ValueDto();
    valueDto.id = 'valueId';
    valueDto.name = 'valueName';
    valueDto.type = 'valueType';
    valueDto.description = 'valueDescription';
    valueDto.analysis = this.getDummyAnalysisDto();
    return valueDto;
  }

  getDummyImpactValueDto(): ImpactValueDto {
    const impactValueDto = new ImpactValueDto();
    impactValueDto.id = 'valueId';
    impactValueDto.name = 'valueName';
    impactValueDto.type = 'valueType';
    impactValueDto.description = 'valueDescription';
    impactValueDto.analysis = this.getDummyImpactAnalysisDto();
    return impactValueDto;
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

  getObservable<T>(content: T): Observable<T> {
    return new Observable((observer) => {
      observer.next(content);
      observer.complete();
    });
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

  readonly dummyStakeholderDtos: StakeholderDto[] = [
    {
      rootEntityID: '1', stakeholderName: 'Patient', stakeholderLevel: 'SOCIETY'
    },
    {
      rootEntityID: '2', stakeholderName: 'Doctor', stakeholderLevel: 'SOCIETY'
    },
    {
      rootEntityID: '3', stakeholderName: 'Family', stakeholderLevel: 'SOCIETY'
    },
    {
      rootEntityID: '4', stakeholderName: 'Ensurance', stakeholderLevel: 'SOCIETY'
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
      description: 'This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact ',
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
