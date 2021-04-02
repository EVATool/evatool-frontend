import {AnalysisDto} from "../dtos/AnalysisDto";

export class Analysis {
  [k: string]: any;

  id = '';

  equalsDto(that: AnalysisDto): boolean {
    return this.id === that.rootEntityID;
  }
}
