import {Injectable} from '@angular/core';
import {MapperService} from './mapper.service';
import {LogService} from '../log.service';
import {RequirementDelta} from '../../model/RequirementDelta';
import {RequirementDeltaDto} from '../../dto/RequirementDeltaDto';
import {Requirement} from '../../model/Requirement';
import {Impact} from '../../model/Impact';

@Injectable({
  providedIn: 'root'
})
export class RequirementDeltaMapperService extends MapperService {

  constructor(protected  logger: LogService) {
    super(logger);
  }

  toDto(requirementDelta: RequirementDelta): RequirementDeltaDto {
    this.logger.debug(this, 'Mapping RequirementDelta to RequirementDeltaDto');
    const requirementDeltaDto = new RequirementDeltaDto();

    requirementDeltaDto.id = requirementDelta.id;
    requirementDeltaDto.originalMerit = requirementDelta.originalMerit;
    requirementDeltaDto.overwriteMerit = requirementDelta.overwriteMerit;
    requirementDeltaDto.minOverwriteMerit = requirementDelta.minOverwriteMerit;
    requirementDeltaDto.maxOverwriteMerit = requirementDelta.maxOverwriteMerit;
    requirementDeltaDto.meritColorCode = requirementDelta.meritColorCode;
    requirementDeltaDto.impactId = requirementDelta.impact.id;
    requirementDeltaDto.requirementId = requirementDelta.requirement.id;

    return requirementDeltaDto;
  }

  fromDto(requirementDeltaDto: RequirementDeltaDto, requirements: Requirement[], impacts: Impact[]): RequirementDelta {
    this.logger.debug(this, 'Mapping RequirementDeltaDto to RequirementDelta');
    const requirementDelta = new RequirementDelta();
    this.updateFromDto(requirementDeltaDto, requirementDelta, requirements, impacts);
    return requirementDelta;
  }

  updateFromDto(requirementDeltaDto: RequirementDeltaDto, requirementDelta: RequirementDelta, requirements: Requirement[], impacts: Impact[]): void {
    requirementDelta.id = requirementDeltaDto.id;
    requirementDelta.originalMerit = requirementDeltaDto.originalMerit;
    requirementDelta.overwriteMerit = requirementDeltaDto.overwriteMerit;
    requirementDelta.minOverwriteMerit = requirementDeltaDto.minOverwriteMerit;
    requirementDelta.maxOverwriteMerit = requirementDeltaDto.maxOverwriteMerit;
    requirementDelta.meritColorCode = requirementDeltaDto.meritColorCode;

    for (const requirement of requirements) {
      if (requirement.id === requirementDeltaDto.requirementId) {
        requirementDelta.requirement = requirement;
        break;
      }
    }
    for (const impact of impacts) {
      if (impact.id === requirementDeltaDto.impactId) {
        requirementDelta.impact = impact;
        break;
      }
    }
  }
}
