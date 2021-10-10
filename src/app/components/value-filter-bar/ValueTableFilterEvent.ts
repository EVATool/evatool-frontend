export class ValueTableFilterEvent {

  valueType: string[];

  constructor(valueType: string[]) {
    this.valueType = valueType;
  }

  static getDefault(): ValueTableFilterEvent {
    return new ValueTableFilterEvent([]);
  }
}
