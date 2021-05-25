export class RequirementDeltaDto {
  id !: string;
  overwriteMerit!: number;
  originalMerit !: number;
  meritColor !: number; // TODO what type?

  analysisId !: string;
  requirementId !: string;
  impactId !: string;
}
