
import { Injectable, Output, EventEmitter } from '@angular/core';
import {Variant} from '../models/Variant';
import {VariantRestService} from "./variant-rest.service";
import {Observable, Subscribable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class VariantDataService {
  @Output() onCreateVariant: EventEmitter<Variant> = new EventEmitter();

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
  }

  getVariants(): void {
    console.log('methode getVariants');

    this.variantRestService.getVariants().subscribe(result =>  {
      this.variants = [];
      result.content.forEach((variantDTO: any) => {
        const variant = {
          id: variantDTO.uuid,
          description: variantDTO.description,
          title: variantDTO.title
        };
        this.variants.push(variant);
        this.onCreateVariant.emit(variant);
      });
      console.log(this.variants);
    });
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
    this.variantRestService.save(variant);
  }

}
