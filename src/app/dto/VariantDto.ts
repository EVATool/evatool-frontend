export class VariantDto {
  id !: string;
  prefixSequenceId !: string;
  name !: string;
  description !: string;
  archived !: boolean;

  analysisId !: string;
  subVariantIds!: string[];
}
