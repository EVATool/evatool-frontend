import {Impact} from '../../../../model/Impact';
import {RequirementDelta} from '../../../../model/RequirementDelta';

export class RequirementDeltasReferencingImpactEvent {

  impact!: Impact;
  deltas!: RequirementDelta[];

  constructor(impact: Impact, deltas: RequirementDelta[]) {
    this.impact = impact;
    this.deltas = deltas;
  }
}
