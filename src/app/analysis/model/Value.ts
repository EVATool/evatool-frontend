import {Analysis} from './Analysis';

export class Value {
  id: any = '';
  name: any = '';
  type: any = '';
  description: any = '';
  editable?: boolean;
  archived?: boolean;
  analysis!: Analysis;
}
