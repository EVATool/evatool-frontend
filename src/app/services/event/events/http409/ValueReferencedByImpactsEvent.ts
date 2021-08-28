import {Value} from '../../../../model/Value';
import {Impact} from '../../../../model/Impact';

export class ValueReferencedByImpactsEvent {

  value!: Value;
  impacts!: Impact[];

  constructor(value: Value, impacts: Impact[]) {
    this.value = value;
    this.impacts = impacts;
  }
}
