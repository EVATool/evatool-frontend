import {AnalysisDTO} from './AnalysisDTO';

export class ValueDTO {
  id: any = '';
  name: any = '';
  type: any = '';
  description: any = '';
  archived?: boolean;
  analysis!: AnalysisDTO;
}
