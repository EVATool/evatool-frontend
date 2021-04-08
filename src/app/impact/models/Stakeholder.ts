import {StakeholderDto} from "../dtos/StakeholderDto";
import {ImpactStakeholderDto} from "../dtos/ImpactStakeholderDto";
import {Analysis} from "./Analysis";

export class Stakeholder {
  [k: string]: any;

  id = '';
  name = '';
  level = '';
  analysis!: Analysis;

  equalsDto(that: StakeholderDto): boolean {
    return this.id === that.rootEntityID
      && this.name === that.stakeholderName
      && this.level === that.stakeholderLevel
      && this.analysis.equalsDto(that.analysis);
  }

  equalsImpactDto(that: ImpactStakeholderDto): boolean {
    return this.id === that.id
      && this.name === that.name
      && this.level === that.level
      && this.analysis.equalsImpactDto(that.analysis);
  }
}
