import { Dimension } from './Dimension';

export class Requirements{
  [k: string]: any;
  rootid = '';
  projetid = '';
  requirementTitle = '';
  requirementDescription = '';
  dimensions!: Dimension[];
  impactDescription!: Map<string, string>;
  requirementImpactPoints!: Map<string, number>;
  variantsTitle!: Map<string, string>;
}
