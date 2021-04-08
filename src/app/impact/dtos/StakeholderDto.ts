import {AnalysisDto} from "./AnalysisDto";

export class StakeholderDto {
  rootEntityID = '';
  stakeholderName = '';
  stakeholderLevel = '';
  analysis!: AnalysisDto;
}
