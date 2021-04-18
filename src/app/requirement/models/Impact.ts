import {Value} from './Value';

export class Impact {
  [k: string]: any;

  id = '';
  uniqueString = '';
  value = 0;
  description = '';
  dimension!: Value;
}
