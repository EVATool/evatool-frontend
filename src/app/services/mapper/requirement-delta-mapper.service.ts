import {Injectable} from '@angular/core';
import {MapperService} from "../mapper.service";
import {LogService} from "../log.service";
import {RequirementDelta} from "../../model/RequirementDelta";
import {RequirementDeltaDto} from "../../dto/RequirementDeltaDto";
import {Requirement} from "../../model/Requirement";
import {Impact} from "../../model/Impact";

@Injectable({
  providedIn: 'root'
})
export class RequirementDeltaMapperService extends MapperService {

  constructor(protected  logger: LogService) {
    super(logger);
  }

  toDto(requirementDelta: RequirementDelta): RequirementDeltaDto {
    this.logger.info(this, 'Mapping RequirementDelta to RequirementDeltaDto');
    const requirementDeltaDto = new RequirementDeltaDto();

    requirementDeltaDto.id = requirementDelta.id;
    requirementDeltaDto.overwriteMerit = requirementDelta.overwriteMerit;
    requirementDeltaDto.impactId = requirementDelta.impact.id;
    requirementDeltaDto.requirementId = requirementDelta.requirement.id;

    return requirementDeltaDto;
  }

  fromDto(requirementDeltaDto: RequirementDeltaDto, requirements: Requirement[], impacts: Impact[]): RequirementDelta {
    this.logger.info(this, 'Mapping RequirementDeltaDto to RequirementDelta');
    const requirementDelta = new RequirementDelta();

    requirementDelta.id = requirementDeltaDto.id;
    requirementDelta.overwriteMerit = requirementDeltaDto.overwriteMerit;
    for (let requirement of requirements) {
      if (requirement.id === requirementDeltaDto.requirementId) {
        requirementDelta.requirement = requirement;
        break;
      }
    }
    for (let impact of impacts) {
      if (impact.id === requirementDeltaDto.impactId) {
        requirementDelta.impact = impact;
        break;
      }
    }

    return requirementDelta;
  }
}
