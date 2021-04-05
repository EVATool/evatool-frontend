import {ValueDto} from "../dtos/ValueDto";
import {ImpactValueDto} from "../dtos/ImpactValueDto";

export class Value {
  [k: string]: any;

  id = '';
  name = '';
  type = '';
  description = '';

  disable = false;

  equalsDto(that: ValueDto): boolean {
    return this.id === that.id
      && this.name === that.name
      && this.type === that.type
      && this.description === that.description;
  }

  equalsImpactDto(that: ImpactValueDto): boolean {
    return this.id === that.id
      && this.name === that.name
      && this.type === that.type
      && this.description === that.description;
  }
}
