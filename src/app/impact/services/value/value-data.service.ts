import {ValueMapperService} from './value-mapper.service';
import {LogService} from '../../../shared/services/log.service';
import {Value} from '../../models/Value';
import {ValueRestService} from './value-rest.service';
import {Injectable, EventEmitter, Output, Inject} from '@angular/core';
import {AnalysisDataService} from "../analysis/analysis-data.service";

@Injectable({
  providedIn: 'root'
})
export class ValueDataService {
  @Output() loadedValues: EventEmitter<Value[]> = new EventEmitter();
  @Output() loadedValuesTypes: EventEmitter<string[]> = new EventEmitter();
  @Output() addedValues: EventEmitter<Value> = new EventEmitter();
  @Output() changedValue: EventEmitter<Value> = new EventEmitter();
  @Output() removedValue: EventEmitter<Value> = new EventEmitter();

  public values: Value[] = [];
  public valuesTypes: string[] = [];

  constructor(
    private logger: LogService,
    private valueMapperService: ValueMapperService,
    private valuesRestService: ValueRestService,
    private analysisDataService: AnalysisDataService) {
  }

  onInit(): void {
    // Load values.
    this.analysisDataService.loadedAnalyses.subscribe(analysis => {
      this.valuesRestService.getValuesByAnalysisId(analysis.id).subscribe(vals => {
        let fromDtos: Value[] = [];
        vals.forEach(val => {
          fromDtos.push(this.valueMapperService.fromDto(val));
        });
        this.values = fromDtos;
        this.logger.info(this, 'Values loaded');
        this.loadedValues.emit(this.values);
      });

      // Load value types.
      this.valuesRestService.getValueTypes().subscribe(valTypes => {
        this.valuesTypes = valTypes;
        this.logger.info(this, 'Value types loaded');
        this.loadedValuesTypes.emit(this.valuesTypes);
      });
    });

    this.analysisDataService.onInit();
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
