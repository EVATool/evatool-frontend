import {HttpLoaderService} from './http-loader.service';
import {HttpInfo} from './HttpInfo';
import {FunctionalErrorCodeService} from './functional-error-code.service';
import {EventEmitter, Injectable, Output} from '@angular/core';
import {Impact} from '../model/Impact';
import {RequirementDelta} from '../model/RequirementDelta';
import {ImpactDataService} from './data/impact-data.service';
import {RequirementDeltaDataService} from './data/requirement-delta-data.service';
import {Stakeholder} from '../model/Stakeholder';
import {Value} from '../model/Value';
import {Variant} from '../model/Variant';
import {Requirement} from '../model/Requirement';
import {VariantDataService} from './data/variant-data.service';
import {RequirementDataService} from './data/requirement-data.service';
import {StakeholderDataService} from './data/stakeholder-data.service';
import {ValueDataService} from './data/value-data.service';

@Injectable({
  providedIn: 'root'
})
export class CrossUiEventService { // TODO use this instead of routing events manually through UI screens
  @Output() impactReferencedByRequirement: EventEmitter<ImpactReferencedByRequirementEvent> = new EventEmitter();
  @Output() stakeholderReferencedByImpact: EventEmitter<StakeholderReferencedByImpactEvent> = new EventEmitter();
  @Output() valueReferencedByImpact: EventEmitter<ValueReferencedByImpactEvent> = new EventEmitter();
  @Output() variantReferencedByRequirement: EventEmitter<VariantReferencedByRequirementEvent> = new EventEmitter();

  @Output() userWantsToSeeImpactReferencedByRequirement: EventEmitter<ImpactReferencedByRequirementEvent> = new EventEmitter();
  @Output() userWantsToSeeStakeholderReferencedByImpact: EventEmitter<StakeholderReferencedByImpactEvent> = new EventEmitter();
  @Output() userWantsToSeeValueReferencedByImpact: EventEmitter<ValueReferencedByImpactEvent> = new EventEmitter();
  @Output() userWantsToSeeVariantReferencedByRequirement: EventEmitter<VariantReferencedByRequirementEvent> = new EventEmitter();

  constructor(private httpLoader: HttpLoaderService,
              private impactData: ImpactDataService,
              private requirementDeltaData: RequirementDeltaDataService,
              private variantData: VariantDataService,
              private requirementData: RequirementDataService,
              private stakeholderData: StakeholderDataService,
              private valueData: ValueDataService) {
  }

  init(): void {
    this.httpLoader.httpError.subscribe((httpInfo: HttpInfo) => {
      switch (httpInfo.functionalErrorCode) {
        case FunctionalErrorCodeService.IMPACT_REFERENCED_BY_REQUIREMENT:
          const impact = this.impactData.impacts.find(i => i.id = httpInfo.tag.impactId);
          const deltas = this.requirementDeltaData.requirementDeltas.filter(rd => httpInfo.tag.requirementDeltaIds.includes(rd.id));
          if (impact && deltas) {
            this.impactReferencedByRequirement.emit(new ImpactReferencedByRequirementEvent(impact, deltas));
          }
          break;

        case FunctionalErrorCodeService.STAKEHOLDER_REFERENCED_BY_IMPACT:
          const stakeholder = this.stakeholderData.stakeholders.find(s => s.id = httpInfo.tag.stakeholderId);
          const impactsStakeholder = this.impactData.impacts.filter(i => httpInfo.tag.impactIds.includes(i.id));
          if (stakeholder && impactsStakeholder) {
            this.stakeholderReferencedByImpact.emit(new StakeholderReferencedByImpactEvent(stakeholder, impactsStakeholder));
          }
          break;

        case FunctionalErrorCodeService.VALUE_REFERENCED_BY_IMPACT:
          const value = this.valueData.values.find(v => v.id = httpInfo.tag.valueId);
          const impactsValue = this.impactData.impacts.filter(i => httpInfo.tag.impactIds.includes(i.id));
          if (value && impactsValue) {
            this.valueReferencedByImpact.emit(new ValueReferencedByImpactEvent(value, impactsValue));
          }
          break;

        case FunctionalErrorCodeService.VARIANT_REFERENCED_BY_REQUIREMENT:
          const variant = this.variantData.variants.find(v => v.id = httpInfo.tag.variantId);
          const requirements = this.requirementData.requirements.filter(r => httpInfo.tag.requirementIds.includes(r.id));
          if (variant && requirements) {
            this.variantReferencedByRequirement.emit(new VariantReferencedByRequirementEvent(variant, requirements));
          }
          break;

        default:
          // no functional error.
          break;
      }
    });
  }
}

export class ImpactReferencedByRequirementEvent {

  impact!: Impact;
  deltas!: RequirementDelta[];

  constructor(impact: Impact, deltas: RequirementDelta[]) {
    this.impact = impact;
    this.deltas = deltas;
  }
}

export class StakeholderReferencedByImpactEvent {

  stakeholder!: Stakeholder;
  impacts!: Impact[];

  constructor(stakeholder: Stakeholder, impacts: Impact[]) {
    this.stakeholder = stakeholder;
    this.impacts = impacts;
  }
}


export class ValueReferencedByImpactEvent {

  value!: Value;
  impacts!: Impact[];

  constructor(value: Value, impacts: Impact[]) {
    this.value = value;
    this.impacts = impacts;
  }
}

export class VariantReferencedByRequirementEvent {

  variant!: Variant;
  requirements!: Requirement[];

  constructor(variant: Variant, requirements: Requirement[]) {
    this.variant = variant;
    this.requirements = requirements;
  }
}
