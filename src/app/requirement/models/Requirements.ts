import {Dimension} from './Dimension';
import {Variants} from "./Variants";
import {RequirementImpactPoints} from "./RequirementImpactPoints";

export class Requirements{
  [k: string]: any;
  rootEntityId!: any;
  projectID = '';
  uniqueString = '';
  requirementDescription = '';
  values!: Dimension[];
  requirementImpactPoints!: RequirementImpactPoints[];
  variantsTitle!: Variants[];
}
