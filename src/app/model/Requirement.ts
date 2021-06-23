import {Variant} from './Variant';
import {Analysis} from './Analysis';

export class Requirement {
  [k: string]: any;

  id!: string;
  prefixSequenceId !: string;
  description !: string;

  analysis!: Analysis;
  variants: Variant[] = [];

  // UI
  highlighted = false;
  deletionFlagged = false;
}
