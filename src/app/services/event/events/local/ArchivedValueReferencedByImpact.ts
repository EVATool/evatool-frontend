import {Impact} from '../../../../model/Impact';
import {Value} from '../../../../model/Value';

export class ArchivedValueReferencedByImpact {

  value: Value;
  impact: Impact;

  constructor(value: Value, impact: Impact) {
    this.value = value;
    this.impact = impact;
  }
}
