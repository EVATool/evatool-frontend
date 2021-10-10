import {Value} from '../../../../model/Value';
import {Impact} from '../../../../model/Impact';

export class ImpactsReferencingValueEvent {

  value!: Value;
  impacts!: Impact[];

  constructor(value: Value, impacts: Impact[]) {
    this.value = value;
    this.impacts = impacts;
  }
}
