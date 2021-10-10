import {Analysis} from './Analysis';

export class VariantType {
  [k: string]: any;

  id !: string;
  name !: string;
  description!: string;

  analysis!: Analysis;
}
