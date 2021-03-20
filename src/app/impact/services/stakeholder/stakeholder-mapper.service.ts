import { ImpactStakeholderDto } from '../../dtos/ImpactStakeholderDto';
import { StakeholderDto } from '../../dtos/StakeholderDto';
import { Stakeholder } from '../../models/Stakeholder';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StakeholderMapperService {

  constructor() { }

  static toDto(stakeholder: Stakeholder): StakeholderDto {
    const stakeholderDto = new StakeholderDto();

    stakeholderDto.rootEntityID = stakeholder.id;
    stakeholderDto.stakeholderName = stakeholder.name;

    return stakeholderDto;
  }

  static fromDto(stakeholderDto: StakeholderDto): Stakeholder {
    const stakeholder = new Stakeholder();

    stakeholder.id = stakeholderDto.rootEntityID;
    stakeholder.name = stakeholderDto.stakeholderName;

    return stakeholder;
  }

  static toImpactDto(stakeholder: Stakeholder): ImpactStakeholderDto {
    const stakeholderDto = new ImpactStakeholderDto();

    stakeholderDto.id = stakeholder.id;
    stakeholderDto.name = stakeholder.name;

    return stakeholderDto;
  }

  static fromImpactDto(stakeholderDto: ImpactStakeholderDto): Stakeholder {
    const stakeholder = new Stakeholder();

    stakeholder.id = stakeholderDto.id;
    stakeholder.name = stakeholderDto.name;

    return stakeholder;
  }
}
