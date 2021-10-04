import {VariantType} from '../../../../model/VariantType';
import {Variant} from '../../../../model/Variant';

export class VariantTypeReferencedByVariants {

  variantType!: VariantType;
  variants!: Variant[];

  constructor(variantType: VariantType, variants: Variant[]) {
    this.variantType = variantType;
    this.variants = variants;
  }
}
