import { AnalysisDto } from './AnalysisDto';
import { StakeholderDto } from './StakeholderDto';
import { DimensionDto } from './DimensionDto';

export class ImpactDto {
  id = '';
  value = 0;
  description = '';
  dimensionDto!: DimensionDto;
  stakeholderDto!: StakeholderDto;
  analysisDto!: AnalysisDto;
}
