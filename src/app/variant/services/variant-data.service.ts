
import {Injectable, Output, EventEmitter, OnInit} from '@angular/core';
import {Variant} from '../models/Variant';
import {Observable, Subscribable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {VariantRestService} from './variant-rest.service';
import {VariantDTO} from '../models/VariantDTO';
import {VariantDialogComponent} from '../variant-dialog/variant-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VariantDataService{
  variants: Variant[] = [];
  matDataSource = new MatTableDataSource<Variant>();
  analysisid: string | null = '';

  constructor( private variantRestService: VariantRestService,
               private router: Router){
    this.matDataSource = new MatTableDataSource<Variant>(this.variants);
    this.loadVariants();
    this.loadAnalysisIDFromRouter();
  }

  loadVariants(): void{
    this.variantRestService.getVariants().subscribe((result: any) => {
      this.variants = [];
      console.log(result);
      result.forEach((variantDTO: VariantDTO) => {
        const variant: Variant = {
          id: variantDTO.id,
          guiId: variantDTO.guiId,
          description: variantDTO.description,
          title: variantDTO.title,
          analysisId: variantDTO.analysisId,
          archived: variantDTO.archived
        };
        this.variants.push(variant);
      });
      this.matDataSource = new MatTableDataSource<Variant>(this.variants);
    });
  }

  getVariants(): Variant[]{
    return this.variants;
  }

  private createDefaultVariant(): Variant {
    const variant = new Variant();
    variant.editable = true;
    return variant;
  }

  createVariant(): void {
    const variant = this.createDefaultVariant();
    this.variants.push(variant);
    this.matDataSource = new MatTableDataSource<Variant>(this.variants);
  }

  save(variant: Variant): void {
    this.variantRestService.createVariants(
      {
        id: '',
        archived: false,
        guiId: '' ,
        title: variant.title,
        description: variant.description,
        subVariant: {},
        analysisId: this.analysisid
      }).subscribe(() => {
        this.loadVariants();
    });
  }

  loadAnalysisIDFromRouter(): void{
    this.router.routerState.root.queryParams.subscribe((paramMap) => {
      this.analysisid = paramMap.id;
     });
  }

  archive(variant: Variant): void {
    this.variantRestService.updateVariants({
      id: variant.id,
      archived: true,
      guiId: variant.guiId ,
      title: variant.title,
      description: variant.description,
      subVariant: {},
      analysisId: variant.analysisId
    }).subscribe(() => {
      this.loadVariants();
    });
  }
}
