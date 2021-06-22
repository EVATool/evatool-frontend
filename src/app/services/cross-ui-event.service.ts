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
export class CrossUiEventService {
  @Output() impactReferencedByRequirements: EventEmitter<ImpactReferencedByRequirementsEvent> = new EventEmitter();
  @Output() stakeholderReferencedByImpacts: EventEmitter<StakeholderReferencedByImpactsEvent> = new EventEmitter();
  @Output() valueReferencedByImpacts: EventEmitter<ValueReferencedByImpactsEvent> = new EventEmitter();
  @Output() variantReferencedByRequirements: EventEmitter<VariantReferencedByRequirementsEvent> = new EventEmitter();

  @Output() userWantsToSeeImpactReferencedByRequirements: EventEmitter<ImpactReferencedByRequirementsEvent> = new EventEmitter();
  @Output() userWantsToSeeStakeholderReferencedByImpacts: EventEmitter<StakeholderReferencedByImpactsEvent> = new EventEmitter(); // TODO
  @Output() userWantsToSeeValueReferencedByImpacts: EventEmitter<ValueReferencedByImpactsEvent> = new EventEmitter();
  @Output() userWantsToSeeVariantReferencedByRequirements: EventEmitter<VariantReferencedByRequirementsEvent> = new EventEmitter();

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
            this.impactReferencedByRequirements.emit(new ImpactReferencedByRequirementsEvent(impact, deltas));
          }
          break;

        case FunctionalErrorCodeService.STAKEHOLDER_REFERENCED_BY_IMPACT:
          const stakeholder = this.stakeholderData.stakeholders.find(s => s.id = httpInfo.tag.stakeholderId);
          const impactsStakeholder = this.impactData.impacts.filter(i => httpInfo.tag.impactIds.includes(i.id));
          if (stakeholder && impactsStakeholder) {
            this.stakeholderReferencedByImpacts.emit(new StakeholderReferencedByImpactsEvent(stakeholder, impactsStakeholder));
          }
          break;

        case FunctionalErrorCodeService.VALUE_REFERENCED_BY_IMPACT:
          const value = this.valueData.values.find(v => v.id = httpInfo.tag.valueId);
          const impactsValue = this.impactData.impacts.filter(i => httpInfo.tag.impactIds.includes(i.id));
          if (value && impactsValue) {
            this.valueReferencedByImpacts.emit(new ValueReferencedByImpactsEvent(value, impactsValue));
          }
          break;

        case FunctionalErrorCodeService.VARIANT_REFERENCED_BY_REQUIREMENT:
          const variant = this.variantData.variants.find(v => v.id = httpInfo.tag.variantId);
          const requirements = this.requirementData.requirements.filter(r => httpInfo.tag.requirementIds.includes(r.id));
          if (variant && requirements) {
            this.variantReferencedByRequirements.emit(new VariantReferencedByRequirementsEvent(variant, requirements));
          }
          break;

        default:
          // no functional error.
          break;
      }
    });
  }
}

// TODO outsource events into file.
export class ImpactReferencedByRequirementsEvent {

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
