import { Dimension } from './Dimension';

export class Requirements{
  [k: string]: any;
  rootEntityId!: any;
  projectID = '';
  uniqueString = '';
  requirementDescription = '';
  dimensions!: Dimension[];
  requirementImpactPoints!: any;
  variantsTitle!: [];
}
