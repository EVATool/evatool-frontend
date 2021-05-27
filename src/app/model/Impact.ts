import {Value} from './Value';
import {Stakeholder} from './Stakeholder';
import {Analysis} from './Analysis';

export class Impact {
  [k: string]: any;

  id !: string;
  prefixSequenceId!: string;
  merit !: number;
  description !: string;

  analysis !: Analysis;
  value!: Value;
  stakeholder!: Stakeholder;
}
