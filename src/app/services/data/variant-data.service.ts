import {EventEmitter, Injectable, OnDestroy, Output} from '@angular/core';
import {DataService} from './data.service';
import {LogService} from '../log.service';
import {AnalysisDataService} from './analysis-data.service';
import {Variant} from '../../model/Variant';
import {VariantRestService} from '../rest/variant-rest.service';
import {VariantMapperService} from '../mapper/variant-mapper.service';
import {Analysis} from '../../model/Analysis';
import {VariantDto} from '../../dto/VariantDto';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Value} from '../../model/Value';
import {VariantTypeDataService} from './variant-type-data.service';

@Injectable({
  providedIn: 'root'
})
export class VariantDataService extends DataService implements OnDestroy {

  private ngUnsubscribe = new Subject();

  @Output() loadedVariants: EventEmitter<Variant[]> = new EventEmitter();
  @Output() createdVariant: EventEmitter<Variant> = new EventEmitter();
  @Output() updatedVariant: EventEmitter<Variant> = new EventEmitter();
  @Output() deletedVariant: EventEmitter<Variant> = new EventEmitter();

  variantsLoaded = false;
  variants: Variant[] = [];

  constructor(protected logger: LogService,
              private variantRest: VariantRestService,
              private variantMapper: VariantMapperService,
              private analysisData: AnalysisDataService,
              private variantTypeData: VariantTypeDataService) {
    super(logger);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  init(): void {
    // Load Variants.
    this.analysisData.loadedCurrentAnalysis
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((analysis: Analysis) => {
        this.variantsLoaded = false;
      });
    this.variantTypeData.loadedVariantTypes
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.loadIfChildrenLoaded(this.analysisData.currentAnalysis.id);
      });
  }

  clearData(): void {
    this.variantsLoaded = false;
    this.variants = [];
  }

  loadIfChildrenLoaded(analysisId: string): void {
    if (!this.variantTypeData.variantTypesLoaded) {
      this.logger.debug(this, 'A child entity collection has not yet been loaded');
      return;
    }
    this.variantRest.getVariantsByAnalysisId(analysisId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((variantDtoList: VariantDto[]) => {
        const tempVariants: Value[] = [];
        variantDtoList.forEach(variantDto => {
          tempVariants.push(this.variantMapper.fromDto(variantDto, [this.analysisData.currentAnalysis], this.variantTypeData.variantTypes));
        });
        this.variants = this.sortDefault(tempVariants);
        this.variantsLoaded = true;
        this.loadedVariants.emit(this.variants);
        this.logger.debug(this, 'Variants loaded');
      });
  }

  createVariant(variant: Variant): void {
    this.variantRest.createVariant(this.variantMapper.toDto(variant))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((variantDto: VariantDto) => {
        const createdVariant = this.variantMapper.fromDto(variantDto, [this.analysisData.currentAnalysis], this.variantTypeData.variantTypes);
        this.variants.push(createdVariant);
        this.createdVariant.emit(createdVariant);
        this.logger.debug(this, 'Variant created');
      });
  }

  updateVariant(variant: Variant): void {
    this.variantRest.updateVariant(this.variantMapper.toDto(variant))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((variantDto: VariantDto) => {
        this.variantMapper.updateFromDto(variantDto, variant, [this.analysisData.currentAnalysis], this.variantTypeData.variantTypes);
        this.updatedVariant.emit(variant);
        this.logger.debug(this, 'Variant updated');
      });
  }

  deleteVariant(variant: Variant): void {
    this.variantRest.deleteVariant(variant.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        const index: number = this.variants.indexOf(variant, 0);
        this.variants.splice(index, 1);
        this.deletedVariant.emit(variant);
        this.logger.debug(this, 'Variant deleted');
      });
  }

  createDefaultVariant(analysis: Analysis): Variant {
    const variant = new Variant();

    variant.name = '';
    variant.description = '';
    variant.archived = false;
    variant.analysis = analysis;
    variant.subVariants = [];
    variant.variantType = this.variantTypeData.variantTypes[0];

    return variant;
  }
}
