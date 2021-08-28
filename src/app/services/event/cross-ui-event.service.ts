import {HttpMarshallService} from '../http/http-marshall.service';
import {HttpInfo} from '../http/HttpInfo';
import {FunctionalErrorCodes} from './functional-error-codes';
import {EventEmitter, Injectable, OnDestroy, Output} from '@angular/core';
import {ImpactDataService} from '../data/impact-data.service';
import {RequirementDeltaDataService} from '../data/requirement-delta-data.service';
import {VariantDataService} from '../data/variant-data.service';
import {RequirementDataService} from '../data/requirement-data.service';
import {StakeholderDataService} from '../data/stakeholder-data.service';
import {ValueDataService} from '../data/value-data.service';
import {AnalysisDataService} from '../data/analysis-data.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {
  AnalysisDeletionFailedEvent,
  AnalysisWithIdNotFound,
  AuthenticationFailedEvent,
  AuthorizationFailedEvent,
  ImpactDeletionFailedEvent,
  ImpactReferencedByRequirementDeltasEvent,
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
import {LogService} from '../log.service';

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
              private requirementDeltaData: RequirementDeltaDataService,
              private  logger: LogService) {
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

            case FunctionalErrorCodes.IMPORT_EXPORT_JSON_INVALID:
              break;

            case FunctionalErrorCodes.USERNAME_INVALID:
              break;

            case FunctionalErrorCodes.REALM_INVALID:
              break;

            case FunctionalErrorCodes.EMAIL_INVALID:
              break;

            case FunctionalErrorCodes.PASSWORD_EMPTY_OR_NULL:
              break;

            case FunctionalErrorCodes.PASSWORD_NOT_SECURE_ENOUGH:
              break;

            case FunctionalErrorCodes.INVALID_CREDENTIALS:
              break;

            case FunctionalErrorCodes.CROSS_REALM_ACCESS:
              break;

            case FunctionalErrorCodes.LOGIN_REALM_NOT_FOUND:
              break;

            case FunctionalErrorCodes.LOGIN_USERNAME_NOT_FOUND:
              break;

            case FunctionalErrorCodes.ANALYSIS_FIND_FAILED_NOT_FOUND:
              break;

            case FunctionalErrorCodes.STAKEHOLDER_FIND_FAILED_NOT_FOUND:
              break;

            case FunctionalErrorCodes.VALUE_FIND_FAILED_NOT_FOUND:
              break;

            case FunctionalErrorCodes.IMPACT_FIND_FAILED_NOT_FOUND:
              break;

            case FunctionalErrorCodes.VARIANT_FIND_FAILED_NOT_FOUND:
              break;

            case FunctionalErrorCodes.REQUIREMENT_FIND_FAILED_NOT_FOUND:
              break;

            case FunctionalErrorCodes.REQUIREMENT_DELTA_FIND_FAILED_NOT_FOUND:
              break;

            case FunctionalErrorCodes.ANALYSIS_UPDATE_FAILED_NOT_FOUND:
              break;

            case FunctionalErrorCodes.STAKEHOLDER_UPDATE_FAILED_NOT_FOUND:
              break;

            case FunctionalErrorCodes.VALUE_UPDATE_FAILED_NOT_FOUND:
              break;

            case FunctionalErrorCodes.IMPACT_UPDATE_FAILED_NOT_FOUND:
              break;

            case FunctionalErrorCodes.VARIANT_UPDATE_FAILED_NOT_FOUND:
              break;

            case FunctionalErrorCodes.REQUIREMENT_UPDATE_FAILED_NOT_FOUND:
              break;

            case FunctionalErrorCodes.REQUIREMENT_DELTA_UPDATE_FAILED_NOT_FOUND:
              break;

            case FunctionalErrorCodes.ANALYSIS_DELETION_FAILED_NOT_FOUND:
              break;

            case FunctionalErrorCodes.STAKEHOLDER_DELETION_FAILED_NOT_FOUND:
              break;

            case FunctionalErrorCodes.VALUE_DELETION_FAILED_NOT_FOUND:
              break;

            case FunctionalErrorCodes.IMPACT_DELETION_FAILED_NOT_FOUND:
              break;

            case FunctionalErrorCodes.VARIANT_DELETION_FAILED_NOT_FOUND:
              break;

            case FunctionalErrorCodes.REQUIREMENT_DELETION_FAILED_NOT_FOUND:
              break;

            case FunctionalErrorCodes.REQUIREMENT_DELTA_DELETION_FAILED_NOT_FOUND:
              break;

            case FunctionalErrorCodes.IMPACT_REFERENCED_BY_REQUIREMENT_DELTA:
              const impact = this.impactData.impacts.find(i => i.id = httpInfo.tag.impactId);
              const deltas = this.requirementDeltaData.requirementDeltas.filter(rd => httpInfo.tag.requirementDeltaIds.includes(rd.id));
              if (impact && deltas) {
                this.impactReferencedByRequirements.emit(new ImpactReferencedByRequirementDeltasEvent(impact, deltas));
              }
              break;

            case FunctionalErrorCodes.STAKEHOLDER_REFERENCED_BY_IMPACT:
              const stakeholder = this.stakeholderData.stakeholders.find(s => s.id = httpInfo.tag.stakeholderId);
              const impactsStakeholder = this.impactData.impacts.filter(i => httpInfo.tag.impactIds.includes(i.id));
              if (stakeholder && impactsStakeholder) {
                this.stakeholderReferencedByImpacts.emit(new StakeholderReferencedByImpactsEvent(stakeholder, impactsStakeholder));
              }
              break;

            case FunctionalErrorCodes.VALUE_REFERENCED_BY_IMPACT:
              const value = this.valueData.values.find(v => v.id = httpInfo.tag.valueId);
              const impactsValue = this.impactData.impacts.filter(i => httpInfo.tag.impactIds.includes(i.id));
              if (value && impactsValue) {
                this.valueReferencedByImpacts.emit(new ValueReferencedByImpactsEvent(value, impactsValue));
              }
              break;

            case FunctionalErrorCodes.VARIANT_REFERENCED_BY_REQUIREMENT:
              const variant = this.variantData.variants.find(v => v.id = httpInfo.tag.variantId);
              const requirements = this.requirementData.requirements.filter(r => httpInfo.tag.requirementIds.includes(r.id));
              if (variant && requirements) {
                this.variantReferencedByRequirements.emit(new VariantReferencedByRequirementsEvent(variant, requirements));
              }
              break;

            case FunctionalErrorCodes.REGISTER_USERNAME_ALREADY_EXISTS:
              break;

            case FunctionalErrorCodes.REGISTER_EMAIL_ALREADY_EXISTS:
              break;

            case FunctionalErrorCodes.REGISTER_REALM_ALREADY_EXISTS:
              break;

            default:
              this.logger.warn(this, 'Unknown functional error code: ' + httpInfo.functionalErrorCode);
              break;
          }
        } else { // Events fired in this else clause must have an explanation for not being a functional error case.
          if (httpInfo.httpStatusCode === 401) {
            // A 401 is returned by the backend if keycloak cannot login properly.
            // This is done by keycloak if a rest call to a normal API endpoint is made (e.g. /stakeholders).
            this.authenticationFailed.emit(new AuthenticationFailedEvent());
          } else if (httpInfo.httpStatusCode === 403) {
            // A 403 is returned by the backend if the user is not properly authorized.
            // This is done by keycloak and cannot be made into an functional error.
            this.authorizationFailed.emit(new AuthorizationFailedEvent());
          }
        }
      });
  }
}
