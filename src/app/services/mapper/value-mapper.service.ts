import {Injectable} from '@angular/core';
import {LogService} from '../log.service';
import {MapperService} from './mapper.service';
import {Value} from '../../model/Value';
import {ValueDto} from '../../dto/ValueDto';
import {Analysis} from '../../model/Analysis';
import {ValueType} from '../../model/ValueType';

@Injectable({
  providedIn: 'root'
})
export class ValueMapperService extends MapperService {

  constructor(protected  logger: LogService) {
    super(logger);
  }

  toDto(value: Value): ValueDto {
    this.logger.debug(this, 'Mapping Value to ValueDto');
    const valueDto = new ValueDto();

    valueDto.id = value.id;
    valueDto.name = value.name;
    valueDto.description = value.description;
    valueDto.archived = value.archived;
    valueDto.analysisId = value.analysis.id;
    valueDto.valueTypeId = value.valueType.id;

    return valueDto;
  }

  fromDto(valueDto: ValueDto, analyses: Analysis[], valueTypes: ValueType[]): Value {
    this.logger.debug(this, 'Mapping ValueDto to Value');
    const value = new Value();
    this.updateFromDto(valueDto, value, analyses, valueTypes);
    return value;
  }

  updateFromDto(valueDto: ValueDto, value: Value, analyses: Analysis[], valueTypes: ValueType[]): void {
    value.id = valueDto.id;
    value.name = valueDto.name;
    value.description = valueDto.description;
    value.archived = valueDto.archived;
    for (const analysis of analyses) {
      if (analysis.id === valueDto.analysisId) {
        value.analysis = analysis;
        break;
      }
    }
    for (const valueType of valueTypes) {
      if (valueType.id === valueDto.valueTypeId) {
        value.valueType = valueType;
        break;
      }
    }
  }
}
