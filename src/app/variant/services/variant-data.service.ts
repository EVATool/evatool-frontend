
import { Injectable, Output, EventEmitter } from '@angular/core';
import {Variant} from '../models/Variant';
import {Observable, Subscribable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {VariantRestService} from './variant-rest.service';
import {VariantDTO} from '../models/VariantDTO';
import {VariantDialogComponent} from '../variant-dialog/variant-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class VariantDataService {
 onCreateVariant: EventEmitter<Variant> = new EventEmitter();

  variants: Variant[] = [];

  constructor( private variantRestService: VariantRestService){

  }

  onInit(){ // Do not call this from the constructor!
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


  save(variant: Variant, variantDialogComponent: VariantDialogComponent): void {
    this.variantRestService.createVariants(
      {
        id: '',
        archived: false,
        guiId: '' ,
        title: variant.title,
        description: variant.description,
        subVariant: {},
        analysisId: '4fa9946b-8f57-4e08-a9c8-3d95e910c8bc'
      }).subscribe(() => {
        variantDialogComponent.loadVariants();
    });
  }

  archive(variant: Variant, variantDialogComponent: VariantDialogComponent): void {
    this.variantRestService.updateVariants({
      id: variant.id,
      archived: true,
      guiId: variant.guiId ,
      title: variant.title,
      description: variant.description,
      subVariant: {},
      analysisId: variant.analysisId
    }).subscribe(() => {
      variantDialogComponent.loadVariants();
    });
  }
}
