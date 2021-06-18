import {Requirement} from './Requirement';
import {Impact} from './Impact';

export class RequirementDelta {
  [k: string]: any;

  id !: string;
  overwriteMerit !: number;
  originalMerit!: number;
  minOverwriteMerit!: number;
  maxOverwriteMerit!: number;
  meritColorCode !: string;

  impact!: Impact;
  requirement!: Requirement;

  // UI
  highlighted = false;
  visible = false;
  hover = false;
}
