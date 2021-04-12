import {Analysis} from './Analysis';
import {Stakeholder} from './Stakeholder';
import {Value} from './Value';
import {ImpactDto} from "../dtos/ImpactDto";

export class Impact {
  [k: string]: any;

  id: string | null = null;
  uniqueString: string | null = null;
  value = 0;
  description = '';
  valueEntity!: Value;
  stakeholder!: Stakeholder;
  analysis!: Analysis;

  highlight = false;

  equalsDto(that: ImpactDto): boolean {
    return this.id === that.id
      && this.uniqueString === that.uniqueString
      && this.value === that.value
      && this.description === that.description
      && this.valueEntity.equalsImpactDto(that.valueEntity)
      && this.stakeholder.equalsImpactDto(that.stakeholder)
      && this.analysis.equalsImpactDto(that.analysis);
  }
}
