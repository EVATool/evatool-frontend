import {Stakeholder} from '../../../../model/Stakeholder';
import {Impact} from '../../../../model/Impact';

export class ImpactsReferencingStakeholderEvent {

  stakeholder!: Stakeholder;
  impacts!: Impact[];

  constructor(stakeholder: Stakeholder, impacts: Impact[]) {
    this.stakeholder = stakeholder;
    this.impacts = impacts;
  }
}
