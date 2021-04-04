import { Injectable, Output, EventEmitter } from '@angular/core';
import {Variants} from "../../models/Variants";

@Injectable({
  providedIn: 'root'
})
export class VariantsDataService {
  @Output() onCreateVariants: EventEmitter<Variants> = new EventEmitter();

  variantsImpacts: Variants[] = [
    {
      entityId: '1',
      variantsTitle: 'Variants1',
      description: 'This is the first read-only variants',
    },
    {
      entityId: '2',
      variantsTitle: 'Variants2',
      description: 'This is the second read-only variants',
    }
  ];

  variants: Variants[] = this.variantsImpacts;

  constructor() {
  }

  getVariants(): Variants[] {
    return this.variants;
  }

  private createDefaultVariants(): Variants {
    let variant = new Variants();

    variant.entityId = 'TEST';
    variant.variantsTitle = 'VariantsTest';
    variant.description = "Dieser Variants wurde erstellt";

    return variant;
  }

  createImpact(): Variants {
    let variant = this.createDefaultVariants();
    this.variants.push(variant);
    this.onCreateVariants.emit(variant);
    return variant;
  }
}
