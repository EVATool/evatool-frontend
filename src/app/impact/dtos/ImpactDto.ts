import { ImpactAnalysisDto } from './ImpactAnalysisDto';
import { ImpactStakeholderDto } from './ImpactStakeholderDto';
import { ValueDto } from './ValueDto';
import {ImpactValueDto} from "./ImpactValueDto";

export class ImpactDto {
  id: string | null = null;
  uniqueString: string | null = null;
  value = 0;
  description = '';
  valueEntity!: ImpactValueDto;
  stakeholder!: ImpactStakeholderDto;
  analysis!: ImpactAnalysisDto;
}
