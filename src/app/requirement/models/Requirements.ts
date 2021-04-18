import {Value} from './Value';
import {Variants} from "./Variants";
import {RequirementImpactPoints} from "./RequirementImpactPoints";

export class Requirements{
  [k: string]: any;
  rootEntityId!: any;
  projectID = '';
  uniqueString = '';
  requirementDescription = '';
  values!: Value[];
  requirementImpactPoints!: RequirementImpactPoints[];
  variantsTitle!: Variants[];
}
