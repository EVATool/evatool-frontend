import { StakeholderDto } from './../StakeholderDto';
import { Stakeholder } from './../../models/Stakeholder';

export class StakeholderDtoMapper {

  static toDto(stakeholder: Stakeholder): StakeholderDto {
    let stakeholderDto = new StakeholderDto();

    stakeholderDto.id = stakeholder.id;
    stakeholderDto.name = stakeholder.name;

    return stakeholderDto;
  }

  static fromDto(stakeholderDto: StakeholderDto): Stakeholder {
    let stakeholder = new Stakeholder();

    stakeholder.id = stakeholderDto.id;
    stakeholder.name = stakeholderDto.name;

    return stakeholder;
  }
}
