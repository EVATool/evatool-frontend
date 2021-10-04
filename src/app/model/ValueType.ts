import {Analysis} from './Analysis';

export class ValueType {
  [k: string]: any;

  id !: string;
  name !: string;
  description!: string;

  analysis!: Analysis;
}
