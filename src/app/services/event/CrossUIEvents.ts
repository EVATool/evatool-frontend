import {Impact} from '../../model/Impact';
import {RequirementDelta} from '../../model/RequirementDelta';
import {Stakeholder} from '../../model/Stakeholder';
import {Value} from '../../model/Value';
import {Variant} from '../../model/Variant';
import {Requirement} from '../../model/Requirement';
import {Analysis} from '../../model/Analysis';

export class ImpactReferencedByRequirementDeltasEvent {

  impact!: Impact;
  deltas!: RequirementDelta[];

  constructor(impact: Impact, deltas: RequirementDelta[]) {
    this.impact = impact;
    this.deltas = deltas;
  }
}

export class StakeholderReferencedByImpactsEvent {

  stakeholder!: Stakeholder;
  impacts!: Impact[];

  constructor(stakeholder: Stakeholder, impacts: Impact[]) {
    this.stakeholder = stakeholder;
    this.impacts = impacts;
  }
}

export class ValueReferencedByImpactsEvent {

  value!: Value;
  impacts!: Impact[];

  constructor(value: Value, impacts: Impact[]) {
    this.value = value;
    this.impacts = impacts;
  }
}

export class VariantReferencedByRequirementsEvent {

  variant!: Variant;
  requirements!: Requirement[];

  constructor(variant: Variant, requirements: Requirement[]) {
    this.variant = variant;
    this.requirements = requirements;
  }
}


export class AnalysisWithIdNotFound {
  id!: string;

  constructor(id: string) {
    this.id = id;
  }
}

export class RealmNotFoundEvent {
  realm!: string;

  constructor(realm: string) {
    this.realm = realm;
  }
}

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

export class AuthenticationFailedEvent {
}

export class AuthorizationFailedEvent {
}
