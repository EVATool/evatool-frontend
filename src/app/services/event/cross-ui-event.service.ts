import {HttpMarshallService} from '../http/http-marshall.service';
import {HttpInfo} from '../http/HttpInfo';
import {FunctionalErrorCodeService} from './functional-error-code.service';
import {EventEmitter, Injectable, OnDestroy, Output} from '@angular/core';
import {Impact} from '../../model/Impact';
import {RequirementDelta} from '../../model/RequirementDelta';
import {ImpactDataService} from '../data/impact-data.service';
import {RequirementDeltaDataService} from '../data/requirement-delta-data.service';
import {Stakeholder} from '../../model/Stakeholder';
import {Value} from '../../model/Value';
import {Variant} from '../../model/Variant';
import {Requirement} from '../../model/Requirement';
import {VariantDataService} from '../data/variant-data.service';
import {RequirementDataService} from '../data/requirement-data.service';
import {StakeholderDataService} from '../data/stakeholder-data.service';
import {ValueDataService} from '../data/value-data.service';
import {Analysis} from '../../model/Analysis';
import {AnalysisDataService} from '../data/analysis-data.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {
  AnalysisDeletionFailedEvent,
  AnalysisWithIdNotFound,
  AuthenticationFailedEvent,
  AuthorizationFailedEvent,
  ImpactDeletionFailedEvent, ImpactReferencedByRequirementDeltasEvent,
  RealmNotFoundEvent,
  RequirementDeletionFailedEvent,
  RequirementDeltaDeletionFailedEvent,
  StakeholderDeletionFailedEvent,
  StakeholderReferencedByImpactsEvent,
  ValueDeletionFailedEvent,
  ValueReferencedByImpactsEvent,
  VariantDeletionFailedEvent,
  VariantReferencedByRequirementsEvent
} from './CrossUIEvents';

@Injectable({
  providedIn: 'root'
})
export class CrossUiEventService implements OnDestroy {

  private ngUnsubscribe = new Subject();

  @Output() initComplete: EventEmitter<void> = new EventEmitter();
  initialized = false;

  @Output() impactReferencedByRequirements: EventEmitter<ImpactReferencedByRequirementDeltasEvent> = new EventEmitter();
  @Output() userWantsToSeeImpactReferencedByRequirements: EventEmitter<ImpactReferencedByRequirementDeltasEvent> = new EventEmitter();

  @Output() stakeholderReferencedByImpacts: EventEmitter<StakeholderReferencedByImpactsEvent> = new EventEmitter();
  @Output() userWantsToSeeStakeholderReferencedByImpacts: EventEmitter<StakeholderReferencedByImpactsEvent> = new EventEmitter();

  @Output() valueReferencedByImpacts: EventEmitter<ValueReferencedByImpactsEvent> = new EventEmitter();
  @Output() userWantsToSeeValueReferencedByImpacts: EventEmitter<ValueReferencedByImpactsEvent> = new EventEmitter();

  @Output() variantReferencedByRequirements: EventEmitter<VariantReferencedByRequirementsEvent> = new EventEmitter();
  @Output() userWantsToSeeVariantReferencedByRequirements: EventEmitter<VariantReferencedByRequirementsEvent> = new EventEmitter();

  @Output() analysisWithValidIdNotFound: EventEmitter<AnalysisWithIdNotFound> = new EventEmitter();

  @Output() realmNotFound: EventEmitter<RealmNotFoundEvent> = new EventEmitter();

  @Output() analysisDeletionFailed: EventEmitter<AnalysisDeletionFailedEvent> = new EventEmitter();
  @Output() stakeholderDeletionFailed: EventEmitter<StakeholderDeletionFailedEvent> = new EventEmitter();
  @Output() valueDeletionFailed: EventEmitter<ValueDeletionFailedEvent> = new EventEmitter();
  @Output() impactDeletionFailed: EventEmitter<ImpactDeletionFailedEvent> = new EventEmitter();
  @Output() variantDeletionFailed: EventEmitter<VariantDeletionFailedEvent> = new EventEmitter();
  @Output() requirementDeletionFailed: EventEmitter<RequirementDeletionFailedEvent> = new EventEmitter();
  @Output() requirementDeltaDeletionFailed: EventEmitter<RequirementDeltaDeletionFailedEvent> = new EventEmitter();

  @Output() authenticationFailed: EventEmitter<AuthenticationFailedEvent> = new EventEmitter();
  @Output() authorizationFailed: EventEmitter<AuthorizationFailedEvent> = new EventEmitter();

  constructor(private httpMarshall: HttpMarshallService,
              private analysisData: AnalysisDataService,
              private valueData: ValueDataService,
              private stakeholderData: StakeholderDataService,
              private impactData: ImpactDataService,
              private variantData: VariantDataService,
              private requirementData: RequirementDataService,
              private requirementDeltaData: RequirementDeltaDataService) {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  init(): void {
    this.httpMarshall.httpError
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((httpInfo: HttpInfo) => {
        if (httpInfo.functionalErrorCode) {
          switch (httpInfo.functionalErrorCode) {
            case FunctionalErrorCodeService.IMPACT_REFERENCED_BY_REQUIREMENT_DELTA:
              const impact = this.impactData.impacts.find(i => i.id = httpInfo.tag.impactId);
              const deltas = this.requirementDeltaData.requirementDeltas.filter(rd => httpInfo.tag.requirementDeltaIds.includes(rd.id));
              if (impact && deltas) {
                this.impactReferencedByRequirements.emit(new ImpactReferencedByRequirementDeltasEvent(impact, deltas));
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
          }
          // TODO this else clause should only contain a case for 403 and one case for 401 for requests to /auth/realms/
          //  All other cases should be functional errors!
        } else {
          const id = httpInfo.path.substr(httpInfo.path.lastIndexOf('/') + 1);
          const pathWithoutSlashId = httpInfo.path.replace('/' + id, '');
          const apiEndpoint = pathWithoutSlashId.substr(pathWithoutSlashId.lastIndexOf('/') + 1);
          const notFound = httpInfo.httpStatusCode === 404;

          if (httpInfo.httpStatusCode === 401) {
            this.authenticationFailed.emit(new AuthenticationFailedEvent());
          } else if (httpInfo.httpStatusCode === 403) {
            this.authorizationFailed.emit(new AuthorizationFailedEvent());
          } else if (httpInfo.method === 'GET' && apiEndpoint === 'analyses' && notFound) {
            this.analysisWithValidIdNotFound.emit(new AnalysisWithIdNotFound(id));
          } else if (httpInfo.path.includes('/auth/realms/') && notFound) {
            this.realmNotFound.emit(new RealmNotFoundEvent(httpInfo.path.split('/')[3]));
          } else if (httpInfo.method === 'DELETE') {
            if (apiEndpoint === 'analyses') {
              const analysis = this.analysisData.analyses.find(a => a.id === id);
              if (analysis) {
                this.analysisDeletionFailed.emit(new AnalysisDeletionFailedEvent(analysis, notFound));
              }
            } else if (apiEndpoint === 'stakeholders') {
              const stakeholder = this.stakeholderData.stakeholders.find(s => s.id === id);
              if (stakeholder) {
                this.stakeholderDeletionFailed.emit(new StakeholderDeletionFailedEvent(stakeholder, notFound));
              }
            } else if (apiEndpoint === 'values') {
              const value = this.valueData.values.find(v => v.id === id);
              if (value) {
                this.valueDeletionFailed.emit(new ValueDeletionFailedEvent(value, notFound));
              }
            } else if (apiEndpoint === 'impacts') {
              const impact = this.impactData.impacts.find(i => i.id === id);
              if (impact) {
                this.impactDeletionFailed.emit(new ImpactDeletionFailedEvent(impact, notFound));
              }
            } else if (apiEndpoint === 'variants') {
              const variant = this.variantData.variants.find(v => v.id === id);
              if (variant) {
                this.variantDeletionFailed.emit(new VariantDeletionFailedEvent(variant, notFound));
              }
            } else if (apiEndpoint === 'requirements') {
              const requirement = this.requirementData.requirements.find(r => r.id === id);
              if (requirement) {
                this.requirementDeletionFailed.emit(new RequirementDeletionFailedEvent(requirement, notFound));
              }
            } else if (apiEndpoint === 'requirement-deltas') {
              const requirementDelta = this.requirementDeltaData.requirementDeltas.find(rd => rd.id === id);
              if (requirementDelta) {
                this.requirementDeltaDeletionFailed.emit(new RequirementDeltaDeletionFailedEvent(requirementDelta, notFound));
              }
            }
          }
        }
      });
  }
}
