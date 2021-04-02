import {Analysis} from './Analysis';
import {Stakeholder} from './Stakeholder';
import {Dimension} from './Dimension';
import {ImpactDto} from "../dtos/ImpactDto";

export class Impact {
  [k: string]: any;

  id: string | null = null;
  uniqueString: string | null = null;
  value = 0;
  description = '';
  dimension!: Dimension;
  stakeholder!: Stakeholder;
  analysis!: Analysis;

  equalsDto(that: ImpactDto): boolean {
    return this.id === that.id
      && this.uniqueString === that.uniqueString
      && this.value === that.value
      && this.description === that.description
      && this.dimension.equalsDto(that.dimension)
      && this.stakeholder.equalsImpactDto(that.stakeholder)
      && this.analysis.equalsImpactDto(that.analysis);
  }
}
