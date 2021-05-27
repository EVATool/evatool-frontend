import {EventEmitter, Injectable, Output} from '@angular/core';
import {DataService} from '../data.service';
import {LogService} from '../log.service';
import {AnalysisDataService} from './analysis-data.service';
import {Variant} from '../../model/Variant';
import {VariantRestService} from '../rest/variant-rest.service';
import {VariantMapperService} from '../mapper/variant-mapper.service';
import {Analysis} from '../../model/Analysis';
import {VariantDto} from '../../dto/VariantDto';

@Injectable({
  providedIn: 'root'
})
export class VariantDataService extends DataService {
  @Output() loadedVariants: EventEmitter<Variant[]> = new EventEmitter();
  @Output() createdVariant: EventEmitter<Variant> = new EventEmitter();
  @Output() updatedVariant: EventEmitter<Variant> = new EventEmitter();
  @Output() deletedVariant: EventEmitter<Variant> = new EventEmitter();

  variants: Variant[] = [];

  constructor(protected logger: LogService,
              private variantRest: VariantRestService,
              private variantMapper: VariantMapperService,
              private analysisData: AnalysisDataService) {
    super(logger);
  }

  init(): void {
    // Load Variants.
    this.analysisData.loadedCurrentAnalysis.subscribe((analysis: Analysis) => {
      this.variantRest.getVariantsByAnalysisId(analysis.id).subscribe((variantDtoList: VariantDto[]) => {
        this.variants = [];
        variantDtoList.forEach(variantDto => {
          this.variants.push(this.variantMapper.fromDto(variantDto, [this.analysisData.currentAnalysis]));
        });
        this.loadedVariants.emit(this.variants);
        this.logger.info(this, 'Variants loaded');
      });
    });
  }

  createVariant(variant: Variant): void {
    this.variantRest.createVariant(this.variantMapper.toDto(variant)).subscribe((variantDto: VariantDto) => {
      const createdVariant = this.variantMapper.fromDto(variantDto, [this.analysisData.currentAnalysis]);
      this.variants.push(createdVariant);
      this.createdVariant.emit(createdVariant);
      this.logger.info(this, 'Variant created');
    });
  }

  updateVariant(variant: Variant): void {
    this.variantRest.updateVariant(this.variantMapper.toDto(variant)).subscribe((variantDto: VariantDto) => {
      const updatedVariant = this.variantMapper.fromDto(variantDto, [this.analysisData.currentAnalysis]);
      this.updatedVariant.emit(updatedVariant);
      this.logger.info(this, 'Variant updated');
    });
  }

  deleteVariant(variant: Variant): void {
    this.variantRest.deleteVariant(variant.id).subscribe(() => {
      const index: number = this.variants.indexOf(variant, 0);
      this.variants.splice(index, 1);
      this.deletedVariant.emit(variant);
      this.logger.info(this, 'Variant deleted');
    });
  }

  createDefaultVariant(analysis: Analysis): Variant {
    const variant = new Variant();

    variant.name = '';
    variant.description = '';
    variant.archived = false;
    variant.analysis = analysis;
    variant.subVariants = [];

    return variant;
  }
}
