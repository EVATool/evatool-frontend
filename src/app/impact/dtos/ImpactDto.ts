import { StakeholderDto } from './StakeholderDto';
import { DimensionDto } from './DimensionDto';

export class ImpactDto {
  id = '';
  value = 0;
  description = '';
  dimension!: DimensionDto;
  stakeholder!: StakeholderDto;
}
