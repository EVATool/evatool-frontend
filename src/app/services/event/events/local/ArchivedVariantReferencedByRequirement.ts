import {Requirement} from '../../../../model/Requirement';
import {Variant} from '../../../../model/Variant';

export class ArchivedVariantReferencedByRequirement {

  variants: Variant[];
  requirement: Requirement;

  constructor(variants: Variant[], requirement: Requirement) {
    this.variants = variants;
    this.requirement = requirement;
  }
}
