import {EventEmitter, Injectable} from '@angular/core';
import {Value} from "../../model/Value";

@Injectable({
  providedIn: 'root'
})
export class ValueDataService {
  onCreateValue: EventEmitter<Value> = new EventEmitter();

  constructor() { }

  private createDefaultValue(): Value {
    const value = new Value();
    value.editable = true;
    return value;
  }

  createSocialValue(): Value {
    const value = this.createDefaultValue();
    this.onCreateValue.emit(value);
    return value;
  }

  createEconomicValue(): Value {
    const value = this.createDefaultValue();
    this.onCreateValue.emit(value);
    return value;
  }
}
