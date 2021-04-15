import {LogService} from '../../../shared/services/log.service';
import {ValueDto} from '../../dtos/ValueDto';
import {Value} from '../../models/Value';
import {Injectable} from '@angular/core';
import {Stakeholder} from "../../models/Stakeholder";
import {ImpactStakeholderDto} from "../../dtos/ImpactStakeholderDto";
import {ImpactValueDto} from "../../dtos/ImpactValueDto";
import {AnalysisMapperService} from "../analysis/analysis-mapper.service";

@Injectable({
  providedIn: 'root'
})
export class ValueMapperService {

  constructor(
    private logger: LogService,
    private analysisMapperServive: AnalysisMapperService) {
  }

  toDto(value: Value): ValueDto {
    this.logger.info(this, 'Mapping Value to ValueDto');
    const valueDto = new ValueDto();

    valueDto.id = value.id;
    valueDto.name = value.name;
    valueDto.type = value.type;
    valueDto.description = value.description;
    valueDto.archived = value.archived;
    valueDto.analysis = this.analysisMapperServive.toDto(value.analysis);

    return valueDto;
  }

  fromDto(valueDto: ValueDto): Value {
    this.logger.info(this, 'Mapping ValueDto to Value');
    const value = new Value();

    value.id = valueDto.id;
    value.name = valueDto.name;
    value.type = valueDto.type;
    value.description = valueDto.description;
    value.archived = valueDto.archived;
    value.analysis = this.analysisMapperServive.fromDto(valueDto.analysis);

    return value;
  }

  toImpactDto(value: Value): ImpactValueDto {
    this.logger.info(this, 'Mapping Value to ImpactValueDto');
    const impactValueDto = new ImpactValueDto();

    impactValueDto.id = value.id;
    impactValueDto.name = value.name;
    impactValueDto.type = value.type;
    impactValueDto.description = value.description;
    impactValueDto.archived = value.archived;
    impactValueDto.analysis = this.analysisMapperServive.toImpactDto(value.analysis);

    return impactValueDto;
  }

  fromImpactDto(impactValueDto: ImpactValueDto): Value {
    this.logger.info(this, 'Mapping ImpactValueDto to Value');
    const value = new Value();

    value.id = impactValueDto.id;
    value.name = impactValueDto.name;
    value.type = impactValueDto.type;
    value.description = impactValueDto.description;
    value.archived = impactValueDto.archived;
    value.analysis = this.analysisMapperServive.fromImpactDto(impactValueDto.analysis);

    return value;
  }
}
