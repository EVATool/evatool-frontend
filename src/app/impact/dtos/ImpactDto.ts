import { ImpactAnalysisDto } from './ImpactAnalysisDto';
import { ImpactStakeholderDto } from './ImpactStakeholderDto';
import { DimensionDto } from './DimensionDto';

export class ImpactDto {
  id: string | null = '';
  uniqueString: string | null = '';
  value = 0;
  description = '';
  dimension!: DimensionDto;
  stakeholder!: ImpactStakeholderDto;
  analysis!: ImpactAnalysisDto;
}
