import { ImpactAnalysisDto } from './ImpactAnalysisDto';
import { ImpactStakeholderDto } from './ImpactStakeholderDto';
import { DimensionDto } from './DimensionDto';

export class ImpactDto {
  id = '';
  value = 0;
  description = '';
  dimensionDto!: DimensionDto;
  stakeholderDto!: ImpactStakeholderDto;
  analysisDto!: ImpactAnalysisDto;
}
