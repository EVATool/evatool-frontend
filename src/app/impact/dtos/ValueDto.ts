import {AnalysisDto} from "./AnalysisDto";

export class ValueDto {
  id = '';
  name = '';
  description = '';
  type = '';
  analysis!: AnalysisDto;
  archived! : boolean;
}
