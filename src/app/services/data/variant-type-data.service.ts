import {Injectable, OnDestroy} from '@angular/core';
import {DataService} from './data.service';
import {ReplaySubject, Subject} from 'rxjs';
import {VariantType} from '../../model/VariantType';
import {LogService} from '../log.service';
import {VariantTypeRestService} from '../rest/variant-type-rest.service';
import {VariantTypeMapperService} from '../mapper/variant-type-mapper.service';
import {AnalysisDataService} from './analysis-data.service';
import {takeUntil} from 'rxjs/operators';
import {Analysis} from '../../model/Analysis';
import {VariantTypeDto} from '../../dto/VariantTypeDto';

@Injectable({
  providedIn: 'root'
})
export class VariantTypeDataService extends DataService implements OnDestroy {

  private ngUnsubscribe = new Subject();

  loadedVariantTypes: Subject<VariantType[]> = new ReplaySubject();
  createdVariantType: Subject<VariantType> = new ReplaySubject();
  updatedVariantType: Subject<VariantType> = new ReplaySubject();
  deletedVariantType: Subject<VariantType> = new ReplaySubject();

  variantTypesLoaded = false;
  variantTypes: VariantType[] = [];
  variantTypePriorities: string[] = [];
  variantTypeLevels: string[] = [];

  constructor(protected logger: LogService,
              private variantTypeRest: VariantTypeRestService,
              private variantTypeMapper: VariantTypeMapperService,
              private analysisData: AnalysisDataService) {
    super(logger);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  init(): void {
    // Load VariantTypes.
    this.analysisData.loadedCurrentAnalysis
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((analysis: Analysis) => {
        //this.variantTypesLoaded = false;
        this.variantTypeRest.getVariantTypesByAnalysisId(analysis.id)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((variantTypeDtoList: VariantTypeDto[]) => {
            const tempVariantTypes: VariantType[] = [];
            variantTypeDtoList.forEach(variantTypeDto => {
              tempVariantTypes.push(this.variantTypeMapper.fromDto(variantTypeDto, [this.analysisData.currentAnalysis]));
            });
            this.variantTypes = this.sortDefault(tempVariantTypes);
            this.variantTypesLoaded = true;
            this.loadedVariantTypes.next(this.variantTypes);
            this.logger.debug(this, 'VariantTypes loaded');
          });
      });
  }

  clearData(): void {
    this.variantTypesLoaded = false;
    this.variantTypes = [];
  }

  createVariantType(variantType: VariantType): void {
    this.variantTypeRest.createVariantType(this.variantTypeMapper.toDto(variantType))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((variantTypeDto: VariantTypeDto) => {
        const createdVariantType = this.variantTypeMapper.fromDto(variantTypeDto, [this.analysisData.currentAnalysis]);
        this.variantTypes.push(createdVariantType);
        this.createdVariantType.next(createdVariantType);
        this.logger.debug(this, 'VariantType created');
      });
  }

  updateVariantType(variantType: VariantType): void {
    this.variantTypeRest.updateVariantType(this.variantTypeMapper.toDto(variantType))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((variantTypeDto: VariantTypeDto) => {
        this.variantTypeMapper.updateFromDto(variantTypeDto, variantType, [this.analysisData.currentAnalysis]);
        this.updatedVariantType.next(variantType);
        this.logger.debug(this, 'VariantType updated');
      });
  }

  deleteVariantType(variantType: VariantType): void {
    this.variantTypeRest.deleteVariantType(variantType.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        const index: number = this.variantTypes.indexOf(variantType, 0);
        this.variantTypes.splice(index, 1);
        this.deletedVariantType.next(variantType);
        this.logger.debug(this, 'VariantType deleted');
      });
  }

  createDefaultVariantType(analysis: Analysis): VariantType {
    const variantType = new VariantType();

    variantType.name = '';
    variantType.priority = this.variantTypePriorities[0];
    variantType.level = this.variantTypeLevels[0];
    variantType.description = '';
    variantType.impacted = null;
    variantType.analysis = analysis;

    return variantType;
  }
}
