import {Analysis} from "./Analysis";

export class Value {
  [k: string]: any;

  id !: string;
  name !: string;
  type !: string;
  description!: string;
  archived!: boolean;

  analysis!: Analysis;
}
