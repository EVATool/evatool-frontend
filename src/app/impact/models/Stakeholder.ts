import {StakeholderDto} from "../dtos/StakeholderDto";
import {ImpactStakeholderDto} from "../dtos/ImpactStakeholderDto";

export class Stakeholder {
  [k: string]: any;

  id = '';
  name = '';

  equalsDto(that: StakeholderDto): boolean {
    return this.id === that.rootEntityID
      && this.name === that.stakeholderName;
  }

  equalsImpactDto(that: ImpactStakeholderDto): boolean {
    return this.id === that.id
      && this.name === that.name;
  }
}
