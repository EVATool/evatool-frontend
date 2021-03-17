
import { Injectable, Output, EventEmitter } from '@angular/core';
import {Variant} from '../models/Variant';
import {Observable, Subscribable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {VariantRestService} from './variant-rest.service';

@Injectable({
  providedIn: 'root'
})
export class VariantDataService {
 onCreateVariant: EventEmitter<Variant> = new EventEmitter();

  variants: Variant[] = [];

  constructor( private variantRestService: VariantRestService){
    this.getVariantsFromServer();
  }

  getVariants(): Variant[]{
    return this.variants;
  }

  getVariantsFromServer(): Observable<any> {
    console.log('methode getVariants');
    return this.variantRestService.getVariants();
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


  save(variant: Variant): void{
    this.variantRestService.createVariants({title: variant.title, description: variant.description,
      stFlagsReal: false, stFlagsPot: false, subVariant: {}, analysisId: '5cf54163-c47b-4e11-a8c0-262e7c0fce2e'}).subscribe();
  }

}
