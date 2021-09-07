import {Impact} from '../../../model/Impact';
import {RequirementDelta} from '../../../model/RequirementDelta';
import {Stakeholder} from '../../../model/Stakeholder';
import {Value} from '../../../model/Value';
import {Variant} from '../../../model/Variant';
import {Requirement} from '../../../model/Requirement';
import {Analysis} from '../../../model/Analysis';

export abstract class DeletionFailedEvent<T> {
  entity!: T;
  notFound!: boolean;

  protected constructor(entity: T, notFound: boolean) {
    this.entity = entity;
    this.notFound = notFound;
  }
}

export class AnalysisDeletionFailedEvent extends DeletionFailedEvent<Analysis> {
  constructor(analysis: Analysis, notFound: boolean) {
    super(analysis, notFound);
  }
}

export class StakeholderDeletionFailedEvent extends DeletionFailedEvent<Stakeholder> {
  constructor(stakeholder: Stakeholder, notFound: boolean) {
    super(stakeholder, notFound);
  }
}

export class ValueDeletionFailedEvent extends DeletionFailedEvent<Value> {
  constructor(value: Value, notFound: boolean) {
    super(value, notFound);
  }
}

export class ImpactDeletionFailedEvent extends DeletionFailedEvent<Impact> {
  constructor(impact: Impact, notFound: boolean) {
    super(impact, notFound);
  }
}

export class VariantDeletionFailedEvent extends DeletionFailedEvent<Variant> {
  constructor(variant: Variant, notFound: boolean) {
    super(variant, notFound);
  }
}

export class RequirementDeletionFailedEvent extends DeletionFailedEvent<Requirement> {
  constructor(requirement: Requirement, notFound: boolean) {
    super(requirement, notFound);
  }
}

export class RequirementDeltaDeletionFailedEvent extends DeletionFailedEvent<RequirementDelta> {
  constructor(requirementDelta: RequirementDelta, notFound: boolean) {
    super(requirementDelta, notFound);
  }
}
