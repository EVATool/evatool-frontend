import {Analysis} from './Analysis';
import {VariantType} from './VariantType';

export class Variant {
  [k: string]: any;

  id !: string;
  prefixSequenceId !: string;
  name !: string;
  description !: string;
  archived!: boolean;

  analysis!: Analysis;
  subVariants: Variant[] = [];
  variantType!: VariantType;

  // UI
  deletionFlagged = false;
}
