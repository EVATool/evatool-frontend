import {Requirement} from './Requirement';
import {Impact} from './Impact';

export class RequirementDelta {
  [k: string]: any;

  id !: string;
  overwriteMerit !: number;

  impact!: Impact;
  requirement!: Requirement;

  // UI
  visible = false;
  hover = false;
}
