import {AnalysisDto} from "../dtos/AnalysisDto";
import {ImpactAnalysisDto} from "../dtos/ImpactAnalysisDto";

export class Analysis {
  [k: string]: any;

  id = '';

  equalsDto(that: AnalysisDto): boolean {
    return this.id === that.rootEntityID;
  }

  equalsImpactDto(that: ImpactAnalysisDto): boolean {
    return this.id === that.id;
  }
}
