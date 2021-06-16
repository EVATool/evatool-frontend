import {Value} from './Value';
import {Stakeholder} from './Stakeholder';
import {Analysis} from './Analysis';

export class Impact {
  [k: string]: any;

  id !: string;
  prefixSequenceId!: string;
  merit !: number;
  description !: string;
  isGoal!: boolean;

  analysis !: Analysis;
  value!: Value;
  stakeholder!: Stakeholder;

  // UI
  highlighted = false;
}
