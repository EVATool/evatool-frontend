import {Injectable} from '@angular/core';
import {LogService} from '../log.service';
import {ValueType} from '../../model/ValueType';
import {ValueTypeDto} from '../../dto/ValueTypeDto';
import {Analysis} from '../../model/Analysis';
import {MapperService} from './mapper.service';

@Injectable({
  providedIn: 'root'
})
export class ValueTypeMapperService extends MapperService {

  constructor(protected  logger: LogService) {
    super(logger);
  }

  toDto(valueType: ValueType): ValueTypeDto {
    this.logger.debug(this, 'Mapping ValueType to ValueTypeDto');
    const valueTypeDto = new ValueTypeDto();

    valueTypeDto.id = valueType.id;
    valueTypeDto.name = valueType.name;
    valueTypeDto.description = valueType.description;
    valueTypeDto.analysisId = valueType.analysis.id;

    return valueTypeDto;
  }

  fromDto(valueTypeDto: ValueTypeDto, analyses: Analysis[]): ValueType {
    this.logger.debug(this, 'Mapping ValueTypeDto to ValueType');
    const valueType = new ValueType();
    this.updateFromDto(valueTypeDto, valueType, analyses);
    return valueType;
  }

  updateFromDto(valueTypeDto: ValueTypeDto, valueType: ValueType, analyses: Analysis[]): void {
    valueType.id = valueTypeDto.id;
    valueType.name = valueTypeDto.name;
    valueType.description = valueTypeDto.description;
    for (const analysis of analyses) {
      if (analysis.id === valueTypeDto.analysisId) {
        valueType.analysis = analysis;
        break;
      }
    }
  }
}
