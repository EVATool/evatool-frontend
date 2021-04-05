
import {Injectable} from '@angular/core';
import {Variant} from '../../models/Variant';
import {VariantDTO} from '../../models/VariantDTO';



@Injectable({
  providedIn: 'root'
})
export class VariantSampleDataService {

  constructor(
   ) {
  }

  readonly dummyVariantDTOs: VariantDTO[] = [];

  readonly  dummyVariants: Variant[] = [];

  getDummyVariant(): Variant{
    return new Variant();
  }

  getDummyVariantDTO(): VariantDTO {
    return new VariantDTO();
  }

}

