export class RequirementDeltaDto {
  id !: string;
  overwriteMerit!: number;
  originalMerit!: number;
  minOverwriteMerit!: number;
  maxOverwriteMerit!: number;
  meritColorCode !: string;

  analysisId !: string;
  requirementId !: string;
  impactId !: string;
}
