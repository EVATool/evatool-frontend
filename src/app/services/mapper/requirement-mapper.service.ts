import {Injectable} from '@angular/core';
import {MapperService} from '../mapper.service';
import {LogService} from '../log.service';
import {RequirementDto} from '../../dto/RequirementDto';
import {Requirement} from '../../model/Requirement';
import {Analysis} from '../../model/Analysis';
import {Variant} from '../../model/Variant';
import {AnalysisDto} from '../../dto/AnalysisDto';

@Injectable({
  providedIn: 'root'
})
export class RequirementMapperService extends MapperService {

  constructor(protected logger: LogService) {
    super(logger);
  }

  toDto(requirement: Requirement): RequirementDto {
    this.logger.info(this, 'Mapping Requirement to RequirementDto');
    const requirementDto = new RequirementDto();

    requirementDto.id = requirement.id;
    requirementDto.prefixSequenceId = requirement.prefixSequenceId;
    requirementDto.description = requirement.description;
    requirementDto.analysisId = requirement.analysis.id;
    requirementDto.variantIds = requirement.variants.map(variant => variant.id);

    return requirementDto;
  }

  fromDto(requirementDto: RequirementDto, analyses: Analysis[], variants: Variant[]): Requirement {
    this.logger.info(this, 'Mapping RequirementDto to Requirement');
    const requirement = new Requirement();
    this.updateFromDto(requirementDto, requirement, analyses, variants);
    return requirement;
  }

  updateFromDto(requirementDto: RequirementDto, requirement: Requirement, analyses: Analysis[], variants: Variant[]): void {
    requirement.id = requirementDto.id;
    requirement.prefixSequenceId = requirementDto.prefixSequenceId;
    requirement.description = requirementDto.description;
    for (const analysis of analyses) {
      if (analysis.id === requirementDto.analysisId) {
        requirement.analysis = analysis;
        break;
      }
    }
    for (const variant of variants) {
      if (requirementDto.variantIds.includes(variant.id)) {
        requirement.variants.push(variant);
      }
    }
  }
}
