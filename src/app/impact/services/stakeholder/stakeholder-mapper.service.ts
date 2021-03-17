import { StakeholderDto } from './../../dtos/StakeholderDto';
import { Stakeholder } from './../../models/Stakeholder';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StakeholderMapperService {

  constructor() { }

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