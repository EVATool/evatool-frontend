import {Variant} from '../../../../model/Variant';
import {Requirement} from '../../../../model/Requirement';

export class VariantReferencedByRequirementsEvent {

  variant!: Variant;
  requirements!: Requirement[];

  constructor(variant: Variant, requirements: Requirement[]) {
    this.variant = variant;
    this.requirements = requirements;
  }
}
