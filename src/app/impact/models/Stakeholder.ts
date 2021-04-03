import {StakeholderDto} from "../dtos/StakeholderDto";
import {ImpactStakeholderDto} from "../dtos/ImpactStakeholderDto";

export class Stakeholder {
  [k: string]: any;

  id = '';
  name = '';
  level = '';

  equalsDto(that: StakeholderDto): boolean {
    return this.id === that.rootEntityID
      && this.name === that.stakeholderName
      && this.level === that.stakeholderLevel;
  }

  equalsImpactDto(that: ImpactStakeholderDto): boolean {
    return this.id === that.id
      && this.name === that.name
      && this.level === that.level;
  }
}
