
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

 /** dummyVariant: Variant[] = [
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
**/
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
    console.log(variant.title);
    variant.editable = false;
    //this.variantRestService.save(variant);
  }

}
