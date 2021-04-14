import {EventEmitter, Injectable, Output} from '@angular/core';
import {Value} from '../../model/Value';
import {ValueRestService} from './value-rest.service';
import {LogService} from '../../../shared/services/log.service';
import {ValueDTO} from '../../model/ValueDTO';

@Injectable({
  providedIn: 'root'
})
export class ValueDataService {

  constructor(
    private logger: LogService,
    private valueRestService: ValueRestService,
  ) {
  }

  @Output() loadedValues: EventEmitter<Value[]> = new EventEmitter();
  @Output() loadedValuesTypes: EventEmitter<string[]> = new EventEmitter();
  // @Output() addedValue: EventEmitter<Value> = new EventEmitter();
  // @Output() changedValue: EventEmitter<Value> = new EventEmitter();
  // @Output() removedValue: EventEmitter<Value> = new EventEmitter();
  // @Output() changedValues: EventEmitter<Value[]> = new EventEmitter();

  public valuesTypes: string[] = [];
  public values: Value[] = [];

  private static fromDto(valueDto: ValueDTO): Value {
    const value = new Value();
    value.id = valueDto.id;
    value.type = valueDto.type;
    value.analysis = valueDto.analysis;
    value.archived = valueDto.archived;
    value.description = valueDto.description;

    return value;
  }

  onInit(): void {
    this.valueRestService.getValueTypes().subscribe(valueTypes => {
      this.valuesTypes = valueTypes;
      this.logger.info(this, 'Value types loaded: ' + this.valuesTypes);
      this.loadedValuesTypes.emit(this.valuesTypes);
    });
  }

  loadValuesByAnalysisId(id: string): void {
    this.valueRestService.getValuesByAnalysisId(id).subscribe(valueDtoList => {
      const values: Value[] = [];
      valueDtoList.forEach((dto: ValueDTO) => {
        values.push(ValueDataService.fromDto(dto));
      });

      this.values = values;
      this.logger.info(this, 'Values loaded');
      this.loadedValues.emit(this.values);
    });
  }

  createValue(value: Value): void {
    // this.logger.info(this, 'Create Value');
    // const valueDto = this.valueMapperService.toDto(value);
    //
    // valueDto.analysis.analysisName = "";
    // valueDto.analysis.analysisDescription = "";
    //
    // this.valueRestService.createValue(valueDto).subscribe((valDto: Value) => {
    //   value.id = valDto.id;
    //   this.values.push(value);
    //   this.addedValue.emit(value);
    //   this.changedValues.emit(this.values);
    // });
  }

  updateValue(value: Value): void {
    // this.logger.info(this, 'Update Value');
    // const valueDto = this.valueMapperService.toDto(value);
    // this.valueRestService.updateValue(valueDto).subscribe((newValue: Value) => {
    //   this.changedValue.emit(newValue);
    //   this.changedValues.emit(this.values);
    // });
  }

  deleteValue(value: Value): void {
    // this.logger.info(this, 'Delete Value');
    // const valueDto = this.valueMapperService.toDto(value);
    // this.valueRestService.deleteValue(valueDto).subscribe((valDto) => {
    //   const index: number = this.values.indexOf(value, 0);
    //   this.values.splice(index, 1);
    //   this.removedValue.emit(value);
    //   this.changedValues.emit(this.values);
    // });
  }
}
