import {ValueMapperService} from './value-mapper.service';
import {LogService} from '../../../shared/services/log.service';
import {Value} from '../../models/Value';
import {ValueRestService} from './value-rest.service';
import {Injectable, EventEmitter, Output} from '@angular/core';
import {AnalysisDataService} from "../analysis/analysis-data.service";

@Injectable({
  providedIn: 'root'
})
export class ValueDataService {
  @Output() loadedValues: EventEmitter<Value[]> = new EventEmitter();
  @Output() loadedValuesTypes: EventEmitter<string[]> = new EventEmitter();
  @Output() addedValue: EventEmitter<Value> = new EventEmitter();
  @Output() changedValue: EventEmitter<Value> = new EventEmitter();
  @Output() removedValue: EventEmitter<Value> = new EventEmitter();
  @Output() changedValues: EventEmitter<Value[]> = new EventEmitter();

  public values: Value[] = [];
  public valuesTypes: string[] = [];

  constructor(
    private logger: LogService,
    private valueMapperService: ValueMapperService,
    private valueRestService: ValueRestService,
    private analysisDataService: AnalysisDataService) {
  }

  onInit(): void {
    // Load values.
    this.analysisDataService.loadedAnalyses.subscribe(analysis => {
      this.valueRestService.getValuesByAnalysisId(analysis.id).subscribe(vals => {
        let fromDtos: Value[] = [];
        vals.forEach(val => {
          fromDtos.push(this.valueMapperService.fromDto(val));
        });
        this.values = fromDtos;
        this.logger.info(this, 'Values loaded');
        this.loadedValues.emit(this.values);
      });

      // Load value types.
      this.valueRestService.getValueTypes().subscribe(valTypes => {
        this.valuesTypes = valTypes;
        this.logger.info(this, 'Value types loaded');
        this.loadedValuesTypes.emit(this.valuesTypes);
      });
    });

    this.analysisDataService.onInit();
  }

  private createDefaultValue() {

  }

  createValue(value: Value) {
    this.logger.info(this, 'Create Value');
    const valueDto = this.valueMapperService.toDto(value);

    valueDto.analysis.analysisName = "";
    valueDto.analysis.analysisDescription = "";

    this.valueRestService.createValue(valueDto).subscribe((valDto: Value) => {
      value.id = valDto.id;
      this.values.push(value);
      this.addedValue.emit(value);
      this.changedValues.emit(this.values);
    });
  }

  updateValue(value: Value) {
    this.logger.info(this, 'Update Value');
    const valueDto = this.valueMapperService.toDto(value);
    this.valueRestService.updateValue(valueDto).subscribe((newValue: Value) => {
      this.changedValue.emit(newValue);
      this.changedValues.emit(this.values);
    });
  }

  deleteValue(value: Value) {
    this.logger.info(this, 'Delete Value');
    const valueDto = this.valueMapperService.toDto(value);
    this.valueRestService.deleteValue(valueDto).subscribe((valDto) => {
      const index: number = this.values.indexOf(value, 0);
      this.values.splice(index, 1);
      this.removedValue.emit(value);
      this.changedValues.emit(this.values);
    });
  }

  getDefaultValue(): Value {
    this.logger.debug(this, 'Get Default Value');
    return this.values[0];
  }

  getDefaultValueType(): string {
    this.logger.debug(this, 'Get Default ValueType');
    return this.valuesTypes[0];
  }
}
