
import { Injectable, Output, EventEmitter } from '@angular/core';
import {Variant} from '../models/Variant';
import {VariantRestService} from "./variant-rest.service";
import {Observable} from 'rxjs';

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

  constructor( private variantRestService: VariantRestService){
  }

  getVariants(): Variant[] {
    this.variantRestService.getVariants();
    return this.variants;
  }

  private createDefaultVariant(): Variant {
    const variant = new Variant();
    variant.editable = true;
    return variant;
  }

  createVariant(): Variant {
    const variant = this.createDefaultVariant();
    this.variants.push(variant);
    this.onCreateVariant.emit(variant);
    return variant;
  }

  save(variant: Variant): Variant{
    this.variantRestService.save(variant);
    this.variants.push(variant);
    variant.editable = false;
    return variant;
  }

}
