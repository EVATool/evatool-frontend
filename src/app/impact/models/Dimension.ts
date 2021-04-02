import {AnalysisDto} from "../dtos/AnalysisDto";
import {ImpactAnalysisDto} from "../dtos/ImpactAnalysisDto";
import {DimensionDto} from "../dtos/DimensionDto";

export class Dimension {
  [k: string]: any;

  id = '';
  name = '';
  type = '';
  description = '';

  equalsDto(that: DimensionDto): boolean {
    return this.id === that.id
      && this.name === that.name
      && this.type === that.type
      && this.description === that.description;
  }

  // TODO
  // equalsImpactDto(that: ImpactDimensionDto): boolean {
  //   return this.id === that.id;
  // }
}
