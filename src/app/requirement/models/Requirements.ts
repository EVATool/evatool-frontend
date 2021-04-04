import { Dimension } from './Dimension';
import {Variants} from "./Variants";

export class Requirements{
  [k: string]: any;
  rootEntityId!: any;
  projectID = '';
  uniqueString = '';
  requirementDescription = '';
  values!: Dimension[];
  requirementImpactPoints!: any;
  variantsTitle!: Variants[];
}
