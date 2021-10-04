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
  ImpactDeletionFailedEvent,
  RequirementDeletionFailedEvent,
  RequirementDeltaDeletionFailedEvent,
  StakeholderDeletionFailedEvent,
  ValueDeletionFailedEvent,
  VariantDeletionFailedEvent,
} from './events/DeletionFailedEvents';
import {LogService} from '../log.service';
import {ImportExportJsonInvalidEvent} from './events/http400/ImportExportJsonInvalidEvent';
import {UsernameInvalidEvent} from './events/http400/UsernameInvalidEvent';
import {RealmInvalidEvent} from './events/http400/RealmInvalidEvent';
import {EmailInvalidEvent} from './events/http400/EmailInvalidEvent';
import {InvalidCredentialsEvent} from './events/http401/InvalidCredentialsEvent';
import {CrossRealmAccessEvent} from './events/http403/CrossRealmAccessEvent';
import {LoginRealmNotFoundEvent} from './events/http404/LoginRealmNotFoundEvent';
import {LoginUsernameNotFoundEvent} from './events/http404/LoginUsernameNotFoundEvent';
import {AnalysisNotFoundEvent} from './events/http404/AnalysisNotFoundEvent';
import {AuthenticationFailedEvent} from './events/http401/AuthenticationFailedEvent';
import {AuthorizationFailedEvent} from './events/http403/AuthorizationFailedEvent';
import {RegisterUsernameAlreadyExistsEvent} from './events/http409/RegisterUsernameAlreadyExistsEvent';
import {RegisterEmailAlreadyExistsEvent} from './events/http409/RegisterEmailAlreadyExistsEvent';
import {RegisterRealmAlreadyExistsEvent} from './events/http409/RegisterRealmAlreadyExistsEvent';
import {ImpactReferencedByRequirementDeltasEvent} from './events/http409/ImpactReferencedByRequirementDeltasEvent';
import {StakeholderReferencedByImpactsEvent} from './events/http409/StakeholderReferencedByImpactsEvent';
import {ValueReferencedByImpactsEvent} from './events/http409/ValueReferencedByImpactsEvent';
import {VariantReferencedByRequirementsEvent} from './events/http409/VariantReferencedByRequirementsEvent';
import {VariantTypeDataService} from '../data/variant-type-data.service';
import {ValueTypeDataService} from '../data/value-type-data.service';
import {ArchivedValueReferencedByImpact} from './events/local/ArchivedValueReferencedByImpact';
import {ArchivedVariantReferencedByRequirement} from './events/local/ArchivedVariantReferencedByRequirement';

@Injectable({
  providedIn: 'root'
})
export class CrossUiEventService implements OnDestroy {

  private ngUnsubscribe = new Subject();

  @Output() initComplete: EventEmitter<void> = new EventEmitter();
  initialized = false;

  // #####################
  // Functional error.
  // #####################

  // 400.
  @Output() importExportJsonInvalid: EventEmitter<ImportExportJsonInvalidEvent> = new EventEmitter();
  @Output() usernameInvalid: EventEmitter<UsernameInvalidEvent> = new EventEmitter();
  @Output() realmInvalid: EventEmitter<RealmInvalidEvent> = new EventEmitter();
  @Output() emailInvalid: EventEmitter<EmailInvalidEvent> = new EventEmitter();

  // 401.
  @Output() invalidCredentials: EventEmitter<InvalidCredentialsEvent> = new EventEmitter();

  // 403.
  @Output() crossRealmAccess: EventEmitter<CrossRealmAccessEvent> = new EventEmitter();
  @Output() remoteIpBlocked: EventEmitter<void> = new EventEmitter();

  // 404.
  @Output() realmNotFound: EventEmitter<LoginRealmNotFoundEvent> = new EventEmitter();
  @Output() usernameNotFound: EventEmitter<LoginUsernameNotFoundEvent> = new EventEmitter();
  @Output() analysisNotFound: EventEmitter<AnalysisNotFoundEvent> = new EventEmitter();

  @Output() analysisDeletionFailed: EventEmitter<AnalysisDeletionFailedEvent> = new EventEmitter();
  @Output() stakeholderDeletionFailed: EventEmitter<StakeholderDeletionFailedEvent> = new EventEmitter();
  @Output() valueDeletionFailed: EventEmitter<ValueDeletionFailedEvent> = new EventEmitter();
  @Output() impactDeletionFailed: EventEmitter<ImpactDeletionFailedEvent> = new EventEmitter();
  @Output() variantDeletionFailed: EventEmitter<VariantDeletionFailedEvent> = new EventEmitter();
  @Output() requirementDeletionFailed: EventEmitter<RequirementDeletionFailedEvent> = new EventEmitter();
  @Output() requirementDeltaDeletionFailed: EventEmitter<RequirementDeltaDeletionFailedEvent> = new EventEmitter();

  // 409.
  @Output() impactReferencedByRequirements: EventEmitter<ImpactReferencedByRequirementDeltasEvent> = new EventEmitter();
  @Output() stakeholderReferencedByImpacts: EventEmitter<StakeholderReferencedByImpactsEvent> = new EventEmitter();
  @Output() valueReferencedByImpacts: EventEmitter<ValueReferencedByImpactsEvent> = new EventEmitter();
  @Output() variantReferencedByRequirements: EventEmitter<VariantReferencedByRequirementsEvent> = new EventEmitter();

  @Output() registerUsernameAlreadyExists: EventEmitter<RegisterUsernameAlreadyExistsEvent> = new EventEmitter();
  @Output() registerEmailAlreadyExists: EventEmitter<RegisterEmailAlreadyExistsEvent> = new EventEmitter();
  @Output() registerRealmAlreadyExists: EventEmitter<RegisterRealmAlreadyExistsEvent> = new EventEmitter();

  // #####################
  // Non-functional errors.
  // #####################
  @Output() authenticationFailed: EventEmitter<AuthenticationFailedEvent> = new EventEmitter();
  @Output() authorizationFailed: EventEmitter<AuthorizationFailedEvent> = new EventEmitter();

  // #####################
  // Other events.
  // #####################
  @Output() userWantsToSeeImpactReferencedByRequirements: EventEmitter<ImpactReferencedByRequirementDeltasEvent> = new EventEmitter();
  @Output() userWantsToSeeStakeholderReferencedByImpacts: EventEmitter<StakeholderReferencedByImpactsEvent> = new EventEmitter();
  @Output() userWantsToSeeValueReferencedByImpacts: EventEmitter<ValueReferencedByImpactsEvent> = new EventEmitter();
  @Output() userWantsToSeeVariantReferencedByRequirements: EventEmitter<VariantReferencedByRequirementsEvent> = new EventEmitter();

  @Output() userWantsToSeeArchivedValueReferencedByImpact: EventEmitter<ArchivedValueReferencedByImpact> = new EventEmitter();
  @Output() userWantsToSeeArchivedVariantReferencedByRequirement: EventEmitter<ArchivedVariantReferencedByRequirement> = new EventEmitter();

  @Output() userWantsToNavigateToValueTab: EventEmitter<void> = new EventEmitter();
  @Output() userWantsToNavigateToVariantTab: EventEmitter<void> = new EventEmitter();

  @Output() userNavigatedToAnalysis: EventEmitter<void> = new EventEmitter();
  @Output() userLeftCurrentAnalysisEdit: EventEmitter<void> = new EventEmitter();

  @Output() highlightTextChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private httpMarshall: HttpMarshallService,
              private analysisData: AnalysisDataService,
              private valueTypeData: ValueTypeDataService,
              private valueData: ValueDataService,
              private stakeholderData: StakeholderDataService,
              private impactData: ImpactDataService,
              private variantTypeData: VariantTypeDataService,
              private variantData: VariantDataService,
              private requirementData: RequirementDataService,
              private requirementDeltaData: RequirementDeltaDataService,
              private logger: LogService) {
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

            // 400.
            case FunctionalErrorCodes.IMPORT_EXPORT_JSON_INVALID:
              this.importExportJsonInvalid.emit(new ImportExportJsonInvalidEvent());
              break;

            case FunctionalErrorCodes.USERNAME_INVALID:
              this.usernameInvalid.emit(new UsernameInvalidEvent(httpInfo.tag.username));
              break;

            case FunctionalErrorCodes.REALM_INVALID:
              this.realmInvalid.emit(new RealmInvalidEvent(httpInfo.tag.realm));
              break;

            case FunctionalErrorCodes.EMAIL_INVALID:
              this.emailInvalid.emit(new EmailInvalidEvent(httpInfo.tag.email));
              break;

            case FunctionalErrorCodes.PASSWORD_EMPTY_OR_NULL:
              break;

            case FunctionalErrorCodes.PASSWORD_NOT_SECURE_ENOUGH:
              break;

            // 401.
            case FunctionalErrorCodes.INVALID_CREDENTIALS:
              const remainingLoginAttempts = httpInfo.tag.remainingLoginAttempts;
              this.invalidCredentials.emit(new InvalidCredentialsEvent(remainingLoginAttempts));
              break;

            // 403.
            case FunctionalErrorCodes.CROSS_REALM_ACCESS:
              this.crossRealmAccess.emit(new CrossRealmAccessEvent());
              break;

            case FunctionalErrorCodes.REMOTE_IP_BLOCKED:
              this.remoteIpBlocked.emit();
              break;

            // 404.
            case FunctionalErrorCodes.LOGIN_REALM_NOT_FOUND:
              this.realmNotFound.emit(new LoginRealmNotFoundEvent(httpInfo.tag.realm));
              break;

            case FunctionalErrorCodes.LOGIN_USERNAME_NOT_FOUND:
              this.usernameNotFound.emit(new LoginUsernameNotFoundEvent(httpInfo.tag.username));
              break;

            case FunctionalErrorCodes.ANALYSIS_FIND_FAILED_NOT_FOUND:
              this.analysisNotFound.emit(new AnalysisNotFoundEvent(httpInfo.tag.id));
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

            // 409.
            case FunctionalErrorCodes.IMPACT_REFERENCED_BY_REQUIREMENT_DELTA:
              const impact = this.impactData.impacts.find(i => i.id = httpInfo.tag.impactId);
              const deltas = this.requirementDeltaData.requirementDeltas.filter(rd => httpInfo.tag.requirementDeltaIds.includes(rd.id));
              if (impact && deltas) {
                this.impactReferencedByRequirements.emit(new ImpactReferencedByRequirementDeltasEvent(impact, deltas));
                this.impactDeletionFailed.emit(new ImpactDeletionFailedEvent(impact, false));
              }
              break;

            case FunctionalErrorCodes.STAKEHOLDER_REFERENCED_BY_IMPACT:
              const stakeholder = this.stakeholderData.stakeholders.find(s => s.id = httpInfo.tag.stakeholderId);
              const impactsStakeholder = this.impactData.impacts.filter(i => httpInfo.tag.impactIds.includes(i.id));
              if (stakeholder && impactsStakeholder) {
                this.stakeholderReferencedByImpacts.emit(new StakeholderReferencedByImpactsEvent(stakeholder, impactsStakeholder));
                this.stakeholderDeletionFailed.emit(new StakeholderDeletionFailedEvent(stakeholder, false));
              }
              break;

            case FunctionalErrorCodes.VALUE_REFERENCED_BY_IMPACT:
              const value = this.valueData.values.find(v => v.id = httpInfo.tag.valueId);
              const impactsValue = this.impactData.impacts.filter(i => httpInfo.tag.impactIds.includes(i.id));
              if (value && impactsValue) {
                this.valueReferencedByImpacts.emit(new ValueReferencedByImpactsEvent(value, impactsValue));
                this.valueDeletionFailed.emit(new ValueDeletionFailedEvent(value, false));
              }
              break;

            case FunctionalErrorCodes.VARIANT_REFERENCED_BY_REQUIREMENT:
              const variant = this.variantData.variants.find(v => v.id = httpInfo.tag.variantId);
              const requirements = this.requirementData.requirements.filter(r => httpInfo.tag.requirementIds.includes(r.id));
              if (variant && requirements) {
                this.variantReferencedByRequirements.emit(new VariantReferencedByRequirementsEvent(variant, requirements));
                this.variantDeletionFailed.emit(new VariantDeletionFailedEvent(variant, false));
              }
              break;

            case FunctionalErrorCodes.REGISTER_USERNAME_ALREADY_EXISTS:
              this.registerUsernameAlreadyExists.emit(new RegisterUsernameAlreadyExistsEvent(httpInfo.tag.username));
              break;

            case FunctionalErrorCodes.REGISTER_EMAIL_ALREADY_EXISTS:
              this.registerEmailAlreadyExists.emit(new RegisterEmailAlreadyExistsEvent(httpInfo.tag.email));
              break;

            case FunctionalErrorCodes.REGISTER_REALM_ALREADY_EXISTS:
              this.registerRealmAlreadyExists.emit(new RegisterRealmAlreadyExistsEvent(httpInfo.tag.realm));
              break;

            default:
              this.logger.warn(this, 'Unknown functional error code: ' + httpInfo.functionalErrorCode);
              break;
          }
        } else { // Events fired in this else clause must have an explanation for not being a functional error case.
          if (httpInfo.httpStatusCode === 401) {
            // A 401 is returned by the backend if keycloak cannot login properly with the provided token.
            // This is done by keycloak if a rest call to a normal API endpoint is made (e.g. /stakeholders).
            this.authenticationFailed.emit(new AuthenticationFailedEvent());
          } else if (httpInfo.httpStatusCode === 403) {
            // A 403 is returned by the backend if the user's token is not properly authorized.
            // This is done by keycloak if a rest call to a normal API endpoint is made (e.g. /stakeholders).
            this.authorizationFailed.emit(new AuthorizationFailedEvent());
          }
        }
      });

    // Subscribe to own events that might be fired by UI components.
    this.userLeftCurrentAnalysisEdit.subscribe(() => {
      this.requirementDeltaData.clearData();
      this.requirementData.clearData();
      this.impactData.clearData();
      this.stakeholderData.clearData();
      this.valueTypeData.clearData();
      this.valueData.clearData();
      this.variantTypeData.clearData();
      this.variantData.clearData();
    });
  }
}
