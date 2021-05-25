export class RequirementDto {
  id !: string;
  prefixSequenceId !: string;
  description !: string;

  analysisId !: string;
  variantIds!: string[];
}
