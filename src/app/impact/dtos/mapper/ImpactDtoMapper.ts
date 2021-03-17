import { StakeholderDtoMapper } from './StakeholderDtoMapper';
import { DimensionDtoMapper } from './DimensionDtoMapper';
import { Impact } from './../../models/Impact';
import { ImpactDto } from './../ImpactDto';
import { StakeholderDto } from './../StakeholderDto';
import { Stakeholder } from './../../models/Stakeholder';
import { DimensionDto } from './../DimensionDto';
import { Dimension } from './../../models/Dimension';

export class ImpactDtoMapper {

  static toDto(impact: Impact): ImpactDto {
    let impactDto = new ImpactDto();

    impactDto.id = impact.id;
    impactDto.value = impact.value;
    impactDto.description = impact.description;

    impactDto.dimension = DimensionDtoMapper.toDto(impact.dimension);
    impactDto.stakeholder = StakeholderDtoMapper.toDto(impact.stakeholder);

    return impactDto;
  }

  static fromDto(impactDto: ImpactDto, dimensions: Dimension[], stakeholders: Stakeholder[]): Impact {
    let impact = new Impact();

    impact.id = impactDto.id;
    impact.value = impactDto.value;
    impact.description = impactDto.description;

    dimensions.forEach(dimension => {
      if (dimension.id === impactDto.dimension.id) {
        impactDto.dimension = dimension;
        return;
      }
    });

    stakeholders.forEach(stakeholder => {
      if (stakeholder.id === impactDto.stakeholder.id) {
        impactDto.stakeholder = stakeholder;
        return;
      }
    });
    
    return impact;
  }
}
