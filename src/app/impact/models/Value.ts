import {ValueDto} from "../dtos/ValueDto";
import {ImpactValueDto} from "../dtos/ImpactValueDto";
import {Analysis} from "./Analysis";

export class Value {
  [k: string]: any;

  id = '';
  name = '';
  type = '';
  description = '';
  analysis!: Analysis;
  archived! : boolean;

  equalsDto(that: ValueDto): boolean {
    return this.id === that.id
      && this.name === that.name
      && this.type === that.type
      && this.description === that.description
      && this.archived === that.archived
      && this.analysis.equalsDto(that.analysis);
  }

  equalsImpactDto(that: ImpactValueDto): boolean {
    return this.id === that.id
      && this.name === that.name
      && this.type === that.type
      && this.description === that.description
      && this.archived === that.archived
      && this.analysis.equalsImpactDto(that.analysis);
  }
}
