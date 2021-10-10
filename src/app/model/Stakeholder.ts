import {Analysis} from './Analysis';

export class Stakeholder {
  [k: string]: any;

  id !: string;
  prefixSequenceId !: string;
  name !: string;
  description!: string;
  priority !: string;
  level !: string;
  impacted!: number | null;

  analysis!: Analysis;

  // UI
  highlighted = false;
  deletionFlagged = false;
}
