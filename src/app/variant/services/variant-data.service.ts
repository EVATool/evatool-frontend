
import {Injectable, Output, EventEmitter, OnInit} from '@angular/core';
import {Variant} from '../models/Variant';
import {MatTableDataSource} from '@angular/material/table';
import {VariantRestService} from './variant-rest.service';
import {VariantDTO} from '../models/VariantDTO';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VariantDataService{
  variants: Variant[] = [];
  variantsArchive: Variant[] = [];
  matDataSource = new MatTableDataSource<Variant>();
  matDataSourceArchive = new MatTableDataSource<Variant>();
  analysisid: string | null = '';

  constructor( private variantRestService: VariantRestService,
               private router: Router){

  }

  init(): void{
    this.loadAnalysisIDFromRouter();
    this.loadVariants();
  }

  loadVariants(): void{
    this.variantRestService.getVariantsByAnalysisId(this.analysisid).subscribe((result: any) => {
      this.variants = [];
      this.variantsArchive = [];
      result.forEach((variantDTO: VariantDTO) => {
        const variant: Variant = {
          id: variantDTO.id,
          guiId: variantDTO.guiId,
          description: variantDTO.description,
          title: variantDTO.title,
          analysisId: variantDTO.analysisId,
          archived: variantDTO.archived
        };
        if (variant.archived){
          this.variantsArchive.push(variant);
        }else{
          this.variants.push(variant);
        }
      });
      this.matDataSource = new MatTableDataSource<Variant>(this.variants);
      this.matDataSourceArchive = new MatTableDataSource<Variant>(this.variantsArchive);
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
    console.log(this.analysisid);
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

  unarchive(variant: Variant): void {
    this.variantRestService.updateVariants({
      id: variant.id,
      archived: false,
      guiId: variant.guiId ,
      title: variant.title,
      description: variant.description,
      subVariant: {},
      analysisId: variant.analysisId
    }).subscribe(() => {
      this.loadVariants();
    });
  }

  delete(variant: Variant): void {
    this.variantRestService.deleteVariants(variant.id).subscribe(() => {
      this.loadVariants();
    });
  }

  update(variant: Variant): void {
    this.variantRestService.updateVariants({
      id: variant.id,
      archived: variant.archived,
      guiId: variant.guiId,
      title: variant.title,
      description: variant.description,
      subVariant: {},
      analysisId: variant.analysisId
    }).subscribe(() => {
      this.loadVariants();
    });
  }
}
