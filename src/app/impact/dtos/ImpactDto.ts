import { ImpactAnalysisDto } from './ImpactAnalysisDto';
import { ImpactStakeholderDto } from './ImpactStakeholderDto';
import { ValueDto } from './ValueDto';

export class ImpactDto {
  id: string | null = null;
  uniqueString: string | null = null;
  value = 0;
  description = '';
  valueEntity!: ValueDto;
  stakeholder!: ImpactStakeholderDto;
  analysis!: ImpactAnalysisDto;
}
