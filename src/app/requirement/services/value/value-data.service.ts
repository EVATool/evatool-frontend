import {Value} from '../../models/Value';
import {ValueRestService} from './value-rest.service';
import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValueDataService {
  @Output() valuesLoaded: EventEmitter<void> = new EventEmitter();
  @Output() valuesTypesLoaded: EventEmitter<void> = new EventEmitter();

  dummyValues: Value[] = [];

  public values: Value[] = this.dummyValues;

  constructor(private restService: ValueRestService) {

  }

  onInit(): void {
    // Load values.
    this.restService.getValues().subscribe(dims => {
      this.values = dims;
      this.valuesLoaded.emit();
    });

    // Load value types.
    this.restService.getValueTypes().subscribe(dimTypes => {
      this.valuesTypesLoaded.emit();
    });
  }

  getValues(): Value[] {
    return this.values;
  }

  getDefaultValue(): Value {
    return this.values[0];
  }

  createValue(value: Value): void {
    this.restService.createValue(value).subscribe(dim => {
      this.values.push(dim);
    });
  }

  updateValue(value: Value): void {
    this.restService.updateValue(value).subscribe(dim => {
      const index: number = this.values.indexOf(value, 0);
      this.values[index] = dim;
    });
  }

  deleteValue(value: Value): void {
    this.restService.deleteValue(value).subscribe(() => {
      const index: number = this.values.indexOf(value, 0);
      this.values.splice(index, 1);
    });
  }
}
