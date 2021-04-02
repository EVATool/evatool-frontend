import { Dimension } from './Dimension';

export class Requirements{
  [k: string]: any;
  rootEntityId!: any;
  projectID = '';
  uniqueString = '';
  requirementDescription = '';
  values!: Dimension[];
  requirementImpactPoints!: any;
  variantsTitle!: [];
}
