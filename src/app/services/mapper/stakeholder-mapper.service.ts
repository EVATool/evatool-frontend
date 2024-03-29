import {Injectable} from '@angular/core';
import {MapperService} from './mapper.service';
import {LogService} from '../log.service';
import {Stakeholder} from '../../model/Stakeholder';
import {StakeholderDto} from '../../dto/StakeholderDto';
import {Analysis} from '../../model/Analysis';

@Injectable({
  providedIn: 'root'
})
export class StakeholderMapperService extends MapperService {

  constructor(protected  logger: LogService) {
    super(logger);
  }

  toDto(stakeholder: Stakeholder): StakeholderDto {
    this.logger.debug(this, 'Mapping Stakeholder to StakeholderDto');
    const stakeholderDto = new StakeholderDto();

    stakeholderDto.id = stakeholder.id;
    stakeholderDto.prefixSequenceId = stakeholder.prefixSequenceId;
    stakeholderDto.name = stakeholder.name;
    stakeholderDto.priority = stakeholder.priority;
    stakeholderDto.level = stakeholder.level;
    stakeholderDto.impacted = stakeholder.impacted;
    stakeholderDto.analysisId = stakeholder.analysis.id;
    stakeholderDto.description = stakeholder.description;

    return stakeholderDto;
  }

  fromDto(stakeholderDto: StakeholderDto, analyses: Analysis[]): Stakeholder {
    this.logger.debug(this, 'Mapping StakeholderDto to Stakeholder');
    const stakeholder = new Stakeholder();
    this.updateFromDto(stakeholderDto, stakeholder, analyses);
    return stakeholder;
  }

  updateFromDto(stakeholderDto: StakeholderDto, stakeholder: Stakeholder, analyses: Analysis[]): void {
    stakeholder.id = stakeholderDto.id;
    stakeholder.prefixSequenceId = stakeholderDto.prefixSequenceId;
    stakeholder.name = stakeholderDto.name;
    stakeholder.priority = stakeholderDto.priority;
    stakeholder.level = stakeholderDto.level;
    stakeholder.impacted = stakeholderDto.impacted;
    for (const analysis of analyses) {
      if (analysis.id === stakeholderDto.analysisId) {
        stakeholder.analysis = analysis;
        break;
      }
    }
    stakeholder.description = stakeholderDto.description;
  }
}
