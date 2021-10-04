import {Analysis} from './Analysis';
import {ValueType} from './ValueType';

export class Value {
  [k: string]: any;

  id !: string;
  name !: string;
  description!: string;
  archived!: boolean;

  analysis!: Analysis;
  valueType!: ValueType;

  // UI
  highlighted = false;
  deletionFlagged = false;
}
