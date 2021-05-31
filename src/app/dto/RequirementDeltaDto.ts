export class RequirementDeltaDto {
  id !: string;
  overwriteMerit!: number;
  originalMerit !: number;
  meritColor !: number; // TODO what type? and min, max...

  analysisId !: string;
  requirementId !: string;
  impactId !: string;
}
