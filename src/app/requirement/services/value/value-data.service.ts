import {Value} from '../../models/Value';
import {ValueRestService} from './value-rest.service';
import {EventEmitter, Injectable, Output} from '@angular/core';
import {Impact} from '../../models/Impact';

@Injectable({
  providedIn: 'root'
})
export class ValueDataService {
  @Output() valuesLoaded: EventEmitter<void> = new EventEmitter();
  @Output() valuesTypesLoaded: EventEmitter<void> = new EventEmitter();

  public values: Value[] = [];

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
}

