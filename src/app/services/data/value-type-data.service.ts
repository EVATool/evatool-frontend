import {Injectable, OnDestroy} from '@angular/core';
import {DataService} from './data.service';
import {ReplaySubject, Subject} from 'rxjs';
import {ValueType} from '../../model/ValueType';
import {LogService} from '../log.service';
import {AnalysisDataService} from './analysis-data.service';
import {takeUntil} from 'rxjs/operators';
import {Analysis} from '../../model/Analysis';
import {ValueTypeDto} from '../../dto/ValueTypeDto';
import {ValueTypeRestService} from '../rest/value-type-rest.service';
import {ValueTypeMapperService} from '../mapper/value-type-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class ValueTypeDataService extends DataService implements OnDestroy {

  private ngUnsubscribe = new Subject();

  loadedValueTypes: Subject<ValueType[]> = new ReplaySubject();
  createdValueType: Subject<ValueType> = new ReplaySubject();
  updatedValueType: Subject<ValueType> = new ReplaySubject();
  deletedValueType: Subject<ValueType> = new ReplaySubject();

  valueTypesLoaded = false;
  valueTypes: ValueType[] = [];
  valueTypePriorities: string[] = [];
  valueTypeLevels: string[] = [];

  constructor(protected logger: LogService,
              private valueTypeRest: ValueTypeRestService,
              private valueTypeMapper: ValueTypeMapperService,
              private analysisData: AnalysisDataService) {
    super(logger);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  init(): void {
    // Load ValueTypes.
    this.analysisData.loadedCurrentAnalysis
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((analysis: Analysis) => {
        //this.valueTypesLoaded = false;
        this.valueTypeRest.getValueTypesByAnalysisId(analysis.id)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((valueTypeDtoList: ValueTypeDto[]) => {
            const tempValueTypes: ValueType[] = [];
            valueTypeDtoList.forEach(valueTypeDto => {
              tempValueTypes.push(this.valueTypeMapper.fromDto(valueTypeDto, [this.analysisData.currentAnalysis]));
            });
            this.valueTypes = this.sortDefault(tempValueTypes);
            this.valueTypesLoaded = true;
            this.loadedValueTypes.next(this.valueTypes);
            this.logger.debug(this, 'ValueTypes loaded');
          });
      });
  }

  clearData(): void {
    this.valueTypesLoaded = false;
    this.valueTypes = [];
  }

  createValueType(valueType: ValueType): void {
    this.valueTypeRest.createValueType(this.valueTypeMapper.toDto(valueType))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((valueTypeDto: ValueTypeDto) => {
        const createdValueType = this.valueTypeMapper.fromDto(valueTypeDto, [this.analysisData.currentAnalysis]);
        this.valueTypes.push(createdValueType);
        this.createdValueType.next(createdValueType);
        this.logger.debug(this, 'ValueType created');
      });
  }

  updateValueType(valueType: ValueType): void {
    this.valueTypeRest.updateValueType(this.valueTypeMapper.toDto(valueType))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((valueTypeDto: ValueTypeDto) => {
        this.valueTypeMapper.updateFromDto(valueTypeDto, valueType, [this.analysisData.currentAnalysis]);
        this.updatedValueType.next(valueType);
        this.logger.debug(this, 'ValueType updated');
      });
  }

  deleteValueType(valueType: ValueType): void {
    this.valueTypeRest.deleteValueType(valueType.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        const index: number = this.valueTypes.indexOf(valueType, 0);
        this.valueTypes.splice(index, 1);
        this.deletedValueType.next(valueType);
        this.logger.debug(this, 'ValueType deleted');
      });
  }

  createDefaultValueType(analysis: Analysis): ValueType {
    const valueType = new ValueType();

    valueType.name = '';
    valueType.priority = this.valueTypePriorities[0];
    valueType.level = this.valueTypeLevels[0];
    valueType.description = '';
    valueType.impacted = null;
    valueType.analysis = analysis;

    return valueType;
  }
}
