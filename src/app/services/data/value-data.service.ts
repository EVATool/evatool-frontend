import {EventEmitter, Injectable, Output} from '@angular/core';
import {DataService} from '../data.service';
import {LogService} from '../log.service';
import {ValueRestService} from '../rest/value-rest.service';
import {ValueMapperService} from '../mapper/value-mapper.service';
import {AnalysisDataService} from './analysis-data.service';
import {Analysis} from '../../model/Analysis';
import {Value} from '../../model/Value';
import {ValueDto} from '../../dto/ValueDto';

@Injectable({
  providedIn: 'root'
})
export class ValueDataService extends DataService {
  @Output() loadedValues: EventEmitter<Value[]> = new EventEmitter();
  @Output() loadedValueTypes: EventEmitter<string[]> = new EventEmitter();
  @Output() createdValue: EventEmitter<Value> = new EventEmitter();
  @Output() updatedValue: EventEmitter<Value> = new EventEmitter();
  @Output() deletedValue: EventEmitter<Value> = new EventEmitter();

  values: Value[] = [];
  valueTypes: string[] = [];

  constructor(protected logger: LogService,
              private valueRest: ValueRestService,
              private valueMapper: ValueMapperService,
              private analysisData: AnalysisDataService) {
    super(logger);
  }

  init(): void {
    // Load Values.
    this.analysisData.loadedCurrentAnalysis.subscribe((analysis: Analysis) => {
      this.valueRest.getValuesByAnalysisId(analysis.id).subscribe((valueDtoList: ValueDto[]) => {
        this.values = [];
        valueDtoList.forEach(valueDto => {
          this.values.push(this.valueMapper.fromDto(valueDto, [this.analysisData.currentAnalysis]));
        });
        this.values = this.sortDefault(this.values);
        this.loadedValues.emit(this.values);
        this.logger.info(this, 'Values loaded');
      });
    });

    // Load Value Types.
    this.valueRest.getValueTypes().subscribe((valueTypes: string[]) => {
      valueTypes.forEach((valueType: string) => this.valueTypes.push(valueType));
      this.loadedValueTypes.emit(this.valueTypes);
    });
  }

  createValue(value: Value): void {
    this.valueRest.createValue(this.valueMapper.toDto(value)).subscribe((valueDto: ValueDto) => {
      const createdValue = this.valueMapper.fromDto(valueDto, [this.analysisData.currentAnalysis]);
      this.values.push(createdValue);
      this.createdValue.emit(createdValue);
      this.logger.info(this, 'Value created');
    });
  }

  updateValue(value: Value): void {
    this.valueRest.updateValue(this.valueMapper.toDto(value)).subscribe((valueDto: ValueDto) => {
      this.valueMapper.updateFromDto(valueDto, value, [this.analysisData.currentAnalysis]);
      this.updatedValue.emit(value);
      this.logger.info(this, 'Value updated');
    });
  }

  deleteValue(value: Value): void {
    this.valueRest.deleteValue(value.id).subscribe(() => {
      const index: number = this.values.indexOf(value, 0);
      this.values.splice(index, 1);
      this.deletedValue.emit(value);
      this.logger.info(this, 'Value deleted');
    });
  }

  createDefaultValue(analysis: Analysis): Value {
    const value = new Value();

    value.name = '';
    value.type = this.valueTypes[0];
    value.description = '';
    value.archived = false;
    value.analysis = analysis;

    return value;
  }
}
