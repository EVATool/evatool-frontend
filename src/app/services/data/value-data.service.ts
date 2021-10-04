import {EventEmitter, Injectable, OnDestroy, Output} from '@angular/core';
import {DataService} from './data.service';
import {LogService} from '../log.service';
import {ValueRestService} from '../rest/value-rest.service';
import {ValueMapperService} from '../mapper/value-mapper.service';
import {AnalysisDataService} from './analysis-data.service';
import {Analysis} from '../../model/Analysis';
import {Value} from '../../model/Value';
import {ValueDto} from '../../dto/ValueDto';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ValueTypeDataService} from './value-type-data.service';

@Injectable({
  providedIn: 'root'
})
export class ValueDataService extends DataService implements OnDestroy {

  private ngUnsubscribe = new Subject();

  @Output() loadedValues: EventEmitter<Value[]> = new EventEmitter();
  @Output() loadedValueTypes: EventEmitter<string[]> = new EventEmitter();
  @Output() createdValue: EventEmitter<Value> = new EventEmitter();
  @Output() updatedValue: EventEmitter<Value> = new EventEmitter();
  @Output() deletedValue: EventEmitter<Value> = new EventEmitter();

  valuesLoaded = false;
  values: Value[] = [];

  constructor(protected logger: LogService,
              private valueRest: ValueRestService,
              private valueMapper: ValueMapperService,
              private analysisData: AnalysisDataService,
              private valueTypeData: ValueTypeDataService) {
    super(logger);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  init(): void {
    // Load Values.
    this.analysisData.loadedCurrentAnalysis
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((analysis: Analysis) => {
        this.valuesLoaded = false;
      });
    this.valueTypeData.loadedValueTypes
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.loadIfChildrenLoaded(this.analysisData.currentAnalysis.id);
      });
  }

  clearData(): void {
    this.valuesLoaded = false;
    this.values = [];
  }

  loadIfChildrenLoaded(analysisId: string): void {
    this.valueRest.getValuesByAnalysisId(analysisId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((valueDtoList: ValueDto[]) => {
        const tempValues: Value[] = [];
        valueDtoList.forEach(valueDto => {
          tempValues.push(this.valueMapper.fromDto(valueDto, [this.analysisData.currentAnalysis], this.valueTypeData.valueTypes));
        });
        this.values = this.sortDefault(tempValues);
        this.valuesLoaded = true;
        this.loadedValues.emit(this.values);
        this.logger.debug(this, 'Values loaded');
      });
  }

  createValue(value: Value): void {
    this.valueRest.createValue(this.valueMapper.toDto(value))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((valueDto: ValueDto) => {
        const createdValue = this.valueMapper.fromDto(valueDto, [this.analysisData.currentAnalysis], this.valueTypeData.valueTypes);
        this.values.push(createdValue);
        this.createdValue.emit(createdValue);
        this.logger.debug(this, 'Value created');
      });
  }

  updateValue(value: Value): void {
    this.valueRest.updateValue(this.valueMapper.toDto(value))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((valueDto: ValueDto) => {
        this.valueMapper.updateFromDto(valueDto, value, [this.analysisData.currentAnalysis], this.valueTypeData.valueTypes);
        this.updatedValue.emit(value);
        this.logger.debug(this, 'Value updated');
      });
  }

  deleteValue(value: Value): void {
    this.valueRest.deleteValue(value.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        const index: number = this.values.indexOf(value, 0);
        this.values.splice(index, 1);
        this.deletedValue.emit(value);
        this.logger.debug(this, 'Value deleted');
      });
  }

  createDefaultValue(analysis: Analysis): Value {
    const value = new Value();

    value.name = '';
    value.description = '';
    value.archived = false;
    value.analysis = analysis;
    value.valueType = this.valueTypeData.valueTypes[0];

    return value;
  }
}
