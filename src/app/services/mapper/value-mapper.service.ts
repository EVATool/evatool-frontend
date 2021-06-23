import {Injectable} from '@angular/core';
import {LogService} from '../log.service';
import {MapperService} from '../mapper.service';
import {Value} from '../../model/Value';
import {ValueDto} from '../../dto/ValueDto';
import {Analysis} from '../../model/Analysis';
import {StakeholderDto} from '../../dto/StakeholderDto';
import {Stakeholder} from '../../model/Stakeholder';
import {dispatchTouchEvent} from '@angular/cdk/testing/testbed/fake-events';

@Injectable({
  providedIn: 'root'
})
export class ValueMapperService extends MapperService {

  constructor(protected  logger: LogService) {
    super(logger);
  }

  toDto(value: Value): ValueDto {
    this.logger.info(this, 'Mapping Value to ValueDto');
    const valueDto = new ValueDto();

    valueDto.id = value.id;
    valueDto.name = value.name;
    valueDto.type = value.type;
    valueDto.description = value.description;
    valueDto.archived = value.archived;
    valueDto.analysisId = value.analysis.id;

    return valueDto;
  }

  fromDto(valueDto: ValueDto, analyses: Analysis[]): Value {
    this.logger.info(this, 'Mapping ValueDto to Value');
    const value = new Value();
    this.updateFromDto(valueDto, value, analyses);
    return value;
  }

  updateFromDto(valueDto: ValueDto, value: Value, analyses: Analysis[]): void {
    value.id = valueDto.id;
    value.name = valueDto.name;
    value.type = valueDto.type;
    value.description = valueDto.description;
    value.archived = valueDto.archived;
    for (const analysis of analyses) {
      if (analysis.id === valueDto.analysisId) {
        value.analysis = analysis;
        break;
      }
    }
  }
}
