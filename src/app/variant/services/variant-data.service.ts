
import { Injectable, Output, EventEmitter } from '@angular/core';
import {Variant} from '../models/Variant';

@Injectable({
  providedIn: 'root'
})
export class VariantDataService {
  @Output() onCreateVariant: EventEmitter<Variant> = new EventEmitter();

  dummyVariant: Variant[] = [
    {
      id: '0',
      title: 'title',
      description: 'This is the first read-only impact',

    },
    {
      id: '2',
      title: 'title0.5',
      description: 'This is the second read-only impact',

    },
    {
      id: '3',
      title: 'title0.9',
      description: 'This is the third read-only impact',
    }
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
