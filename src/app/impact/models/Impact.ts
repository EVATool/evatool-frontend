import { Analysis } from './Analysis';
import { Stakeholder } from './Stakeholder';
import { Dimension } from './Dimension';

export class Impact {
  [k: string]: any;

  id = '';
  numericId = '';
  value = 0;
  description = '';
  dimension!: Dimension;
  stakeholder!: Stakeholder;
  analysis!: Analysis;
}
