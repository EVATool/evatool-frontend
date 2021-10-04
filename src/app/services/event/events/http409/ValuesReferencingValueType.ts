import {Value} from '../../../../model/Value';
import {ValueType} from '../../../../model/ValueType';

export class ValuesReferencingValueType {

  valueType!: ValueType;
  values!: Value[];

  constructor(valueType: ValueType, values: Value[]) {
    this.valueType = valueType;
    this.values = values;
  }
}
