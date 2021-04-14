import {ImpactAnalysisDto} from "./ImpactAnalysisDto";

export class ImpactValueDto {
  id = '';
  name = '';
  description = '';
  type = '';
  analysis!: ImpactAnalysisDto;
  archived! : boolean;
}
