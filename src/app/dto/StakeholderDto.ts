export class StakeholderDto {
  id!: string;
  prefixSequenceId !: string;
  name !: string;
  description!: string;
  priority!: string;
  level !: string;
  impacted!: number | null;

  analysisId !: string;
}
