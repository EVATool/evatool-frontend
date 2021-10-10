export class VariantTableFilterEvent {

  variantType: string[];

  constructor(variantType: string[]) {
    this.variantType = variantType;
  }

  static getDefault(): VariantTableFilterEvent {
    return new VariantTableFilterEvent([]);
  }
}
