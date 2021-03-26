import { Dimension } from './Dimension';

export class Impact {
  [k: string]: any;

  id = '';
  value = 0;
  description = '';
  dimension!: Dimension;
}
