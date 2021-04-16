import {EventEmitter, Injectable, Output} from '@angular/core';
import {Variants} from "../../models/Variants";
import {RequirementsRestService} from '../requirements/requirements-rest.service';
import {Router} from '@angular/router';
import {Requirements} from '../../models/Requirements';

@Injectable({
  providedIn: 'root'
})
export class VariantsDataService {
  @Output() onCreateVariants: EventEmitter<Variants> = new EventEmitter();
  @Output() loadedVariants: EventEmitter<Requirements[]> = new EventEmitter();

  variantsImpacts: Variants[] = [
    {
      entityId: '1',
      variantsTitle: 'Variants1',
      description: 'This is the first read-only variants',
      archived: false
    },
    {
      entityId: '2',
      variantsTitle: 'Variants2',
      description: 'This is the second read-only variants',
      archived: false
    }
  ];

  variantsSoureces: Variants[] = [];

  constructor(private requirementsRestService: RequirementsRestService, private router: Router) {
  }

  onInit(): void {
    this.requirementsRestService.getVariants().subscribe((result: any) => {
      this.variantsSoureces = [];
      result.forEach((variantsRest: Variants) => {
        const variants: Variants = {
          entityId: variantsRest.id,
          description: variantsRest.description,
          variantsTitle: variantsRest.title,
          archived: variantsRest.archived
        };
        this.variantsSoureces.push(variants);
      });

    });
  }

  getVariants(): Variants[] {

    return this.variantsSoureces;
  }

  private createDefaultVariants(): Variants {
    let variant = new Variants();

    variant.entityId = 'TEST';
    variant.variantsTitle = 'VariantsTest';
    variant.description = "Dieser Variants wurde erstellt";

    return variant;
  }

  // createImpact(): Variants {
  //   let variant = this.createDefaultVariants();
  //   this.variantsSoureces.push(variant);
  //   this.onCreateVariants.emit(variant[]);
  //   return variant;
  // }
}
