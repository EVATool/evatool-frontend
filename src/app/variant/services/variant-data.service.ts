
import { Injectable, Output, EventEmitter } from '@angular/core';
import {Variant} from '../models/Variant';

@Injectable({
  providedIn: 'root'
})
export class VariantDataService {
  @Output() onCreateVariant: EventEmitter<Variant> = new EventEmitter();

  dummyVariant: Variant[] = [
    ];

  variants: Variant[] = this.dummyVariant;

  constructor(){
  }

  getVariants(): Variant[] {
    return this.variants;
  }

  private createDefaultVariant(): Variant {
    return new Variant();
  }

  createVariant(): Variant {
    const variant = this.createDefaultVariant();
    this.variants.push(variant);
    this.onCreateVariant.emit(variant);
    return variant;
  }
}
