import {Analysis} from "./Analysis";

export class Variant {
  [k: string]: any;

  id !: string;
  prefixSequenceId !: string;
  name !: string;
  description !: string;
  archived!: boolean;

  analysis!: Analysis;
  subVariants: Variant[] = [];
}
