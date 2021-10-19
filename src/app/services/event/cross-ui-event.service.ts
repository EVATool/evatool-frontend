import {HttpMarshallService} from '../http/http-marshall.service';
import {HttpInfo} from '../http/HttpInfo';
import {FunctionalErrorCodes} from './functional-error-codes';
import {ImpactDataService} from '../data/impact-data.service';
import {RequirementDeltaDataService} from '../data/requirement-delta-data.service';
import {VariantDataService} from '../data/variant-data.service';
import {RequirementDataService} from '../data/requirement-data.service';
import {StakeholderDataService} from '../data/stakeholder-data.service';
import {ValueDataService} from '../data/value-data.service';
import {AnalysisDataService} from '../data/analysis-data.service';
import {takeUntil} from 'rxjs/operators';
import {
  AnalysisDeletionFailedEvent,
  ImpactDeletionFailedEvent,
  RequirementDeletionFailedEvent,
  RequirementDeltaDeletionFailedEvent,
  StakeholderDeletionFailedEvent,
  ValueDeletionFailedEvent,
  ValueTypeDeletionFailedEvent,
  VariantDeletionFailedEvent,
  VariantTypeDeletionFailedEvent,
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
import {RequirementDeltasReferencingImpactEvent} from './events/http409/RequirementDeltasReferencingImpactEvent';
import {ImpactsReferencingStakeholderEvent} from './events/http409/ImpactsReferencingStakeholderEvent';
import {ImpactsReferencingValueEvent} from './events/http409/ImpactsReferencingValueEvent';
import {RequirementsReferencingVariantEvent} from './events/http409/RequirementsReferencingVariantEvent';
import {VariantTypeDataService} from '../data/variant-type-data.service';
import {ValueTypeDataService} from '../data/value-type-data.service';
import {ArchivedValueReferencedByImpact} from './events/local/ArchivedValueReferencedByImpact';
import {ArchivedVariantReferencedByRequirement} from './events/local/ArchivedVariantReferencedByRequirement';
import {ValuesReferencingValueType} from './events/http409/ValuesReferencingValueType';
import {VariantsReferencingVariantType} from './events/http409/VariantsReferencingVariantType';
import {Injectable, OnDestroy} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrossUiEventService implements OnDestroy {

  private ngUnsubscribe = new Subject();

  initComplete: Subject<void> = new ReplaySubject();
  initialized = false;

  // #####################
  // Functional error.
  // #####################

  // 400.
  importExportJsonInvalid: Subject<ImportExportJsonInvalidEvent> = new ReplaySubject();
  usernameInvalid: Subject<UsernameInvalidEvent> = new ReplaySubject();
  realmInvalid: Subject<RealmInvalidEvent> = new ReplaySubject();
  emailInvalid: Subject<EmailInvalidEvent> = new ReplaySubject();

  // 401.
  invalidCredentials: Subject<InvalidCredentialsEvent> = new ReplaySubject();

  // 403.
  crossRealmAccess: Subject<CrossRealmAccessEvent> = new ReplaySubject();
  remoteIpBlocked: Subject<void> = new ReplaySubject();

  // 404.
  realmNotFound: Subject<LoginRealmNotFoundEvent> = new ReplaySubject();
  usernameNotFound: Subject<LoginUsernameNotFoundEvent> = new ReplaySubject();
  analysisNotFound: Subject<AnalysisNotFoundEvent> = new ReplaySubject();

  analysisDeletionFailed: Subject<AnalysisDeletionFailedEvent> = new ReplaySubject();
  stakeholderDeletionFailed: Subject<StakeholderDeletionFailedEvent> = new ReplaySubject();
  valueTypeDeletionFailed: Subject<ValueTypeDeletionFailedEvent> = new ReplaySubject();
  valueDeletionFailed: Subject<ValueDeletionFailedEvent> = new ReplaySubject();
  impactDeletionFailed: Subject<ImpactDeletionFailedEvent> = new ReplaySubject();
  variantTypeDeletionFailed: Subject<VariantTypeDeletionFailedEvent> = new ReplaySubject();
  variantDeletionFailed: Subject<VariantDeletionFailedEvent> = new ReplaySubject();
  requirementDeletionFailed: Subject<RequirementDeletionFailedEvent> = new ReplaySubject();
  requirementDeltaDeletionFailed: Subject<RequirementDeltaDeletionFailedEvent> = new ReplaySubject();

  // 409.
  impactReferencedByRequirements: Subject<RequirementDeltasReferencingImpactEvent> = new ReplaySubject();
  stakeholderReferencedByImpacts: Subject<ImpactsReferencingStakeholderEvent> = new ReplaySubject();
  valueReferencedByImpacts: Subject<ImpactsReferencingValueEvent> = new ReplaySubject();
  variantReferencedByRequirements: Subject<RequirementsReferencingVariantEvent> = new ReplaySubject();
  valueTypeReferencedByValues: Subject<ValuesReferencingValueType> = new ReplaySubject();
  variantTypeReferencedByVariants: Subject<VariantsReferencingVariantType> = new ReplaySubject();


  registerUsernameAlreadyExists: Subject<RegisterUsernameAlreadyExistsEvent> = new ReplaySubject();
  registerEmailAlreadyExists: Subject<RegisterEmailAlreadyExistsEvent> = new ReplaySubject();
  registerRealmAlreadyExists: Subject<RegisterRealmAlreadyExistsEvent> = new ReplaySubject();

  // #####################
  // Non-functional errors.
  // #####################
  authenticationFailed: Subject<AuthenticationFailedEvent> = new ReplaySubject();
  authorizationFailed: Subject<AuthorizationFailedEvent> = new ReplaySubject();

  // #####################
  // Other events.
  // #####################
  userWantsToSeeRequirementsReferencingImpact: Subject<RequirementDeltasReferencingImpactEvent> = new ReplaySubject();
  userWantsToSeeImpactsReferencingStakeholder: Subject<ImpactsReferencingStakeholderEvent> = new ReplaySubject();
  userWantsToSeeImpactsReferencingValue: Subject<ImpactsReferencingValueEvent> = new ReplaySubject();
  userWantsToSeeRequirementsReferencingVariant: Subject<RequirementsReferencingVariantEvent> = new ReplaySubject();
  userWantsToSeeValuesReferencingValueType: Subject<ValuesReferencingValueType> = new ReplaySubject();
  userWantsToSeeVariantsReferencingVariantType: Subject<VariantsReferencingVariantType> = new ReplaySubject();

  userWantsToSeeArchivedValueReferencedByImpact: Subject<ArchivedValueReferencedByImpact> = new ReplaySubject();
  userWantsToSeeArchivedVariantReferencedByRequirement: Subject<ArchivedVariantReferencedByRequirement> = new ReplaySubject();

  userWantsToNavigateToValueTab: Subject<void> = new ReplaySubject();
  userWantsToNavigateToStakeholderTab: Subject<void> = new ReplaySubject();

  userNavigatedToAnalysis: Subject<void> = new ReplaySubject();
  userLeftCurrentAnalysisEdit: Subject<void> = new ReplaySubject();

  highlightTextChanged: Subject<string> = new Subject<string>();

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
              this.importExportJsonInvalid.next(new ImportExportJsonInvalidEvent());
              break;

            case FunctionalErrorCodes.USERNAME_INVALID:
              this.usernameInvalid.next(new UsernameInvalidEvent(httpInfo.tag.username));
              break;

            case FunctionalErrorCodes.REALM_INVALID:
              this.realmInvalid.next(new RealmInvalidEvent(httpInfo.tag.realm));
              break;

            case FunctionalErrorCodes.EMAIL_INVALID:
              this.emailInvalid.next(new EmailInvalidEvent(httpInfo.tag.email));
              break;

            case FunctionalErrorCodes.PASSWORD_EMPTY_OR_NULL:
              break;

            case FunctionalErrorCodes.PASSWORD_NOT_SECURE_ENOUGH:
              break;

            // 401.
            case FunctionalErrorCodes.INVALID_CREDENTIALS:
              const remainingLoginAttempts = httpInfo.tag.remainingLoginAttempts;
              this.invalidCredentials.next(new InvalidCredentialsEvent(remainingLoginAttempts));
              break;

            // 403.
            case FunctionalErrorCodes.CROSS_REALM_ACCESS:
              this.crossRealmAccess.next(new CrossRealmAccessEvent());
              break;

            case FunctionalErrorCodes.REMOTE_IP_BLOCKED:
              this.remoteIpBlocked.next();
              break;

            // 404.
            case FunctionalErrorCodes.LOGIN_REALM_NOT_FOUND:
              this.realmNotFound.next(new LoginRealmNotFoundEvent(httpInfo.tag.realm));
              break;

            case FunctionalErrorCodes.LOGIN_USERNAME_NOT_FOUND:
              this.usernameNotFound.next(new LoginUsernameNotFoundEvent(httpInfo.tag.username));
              break;

            case FunctionalErrorCodes.ANALYSIS_FIND_FAILED_NOT_FOUND:
              this.analysisNotFound.next(new AnalysisNotFoundEvent(httpInfo.tag.id));
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
                this.impactReferencedByRequirements.next(new RequirementDeltasReferencingImpactEvent(impact, deltas));
                this.impactDeletionFailed.next(new ImpactDeletionFailedEvent(impact, false));
              }
              break;

            case FunctionalErrorCodes.STAKEHOLDER_REFERENCED_BY_IMPACT:
              const stakeholder = this.stakeholderData.stakeholders.find(s => s.id = httpInfo.tag.stakeholderId);
              const impactsStakeholder = this.impactData.impacts.filter(i => httpInfo.tag.impactIds.includes(i.id));
              if (stakeholder && impactsStakeholder) {
                this.stakeholderReferencedByImpacts.next(new ImpactsReferencingStakeholderEvent(stakeholder, impactsStakeholder));
                this.stakeholderDeletionFailed.next(new StakeholderDeletionFailedEvent(stakeholder, false));
              }
              break;

            case FunctionalErrorCodes.VALUE_TYPE_REFERENCED_BY_VALUE:
              const valueType = this.valueTypeData.valueTypes.find(v => v.id = httpInfo.tag.valueTypeId);
              const valuesValueType = this.valueData.values.filter(i => httpInfo.tag.valueIds.includes(i.id));
              if (valueType && valuesValueType) {
                this.valueTypeReferencedByValues.next(new ValuesReferencingValueType(valueType, valuesValueType));
                this.valueTypeDeletionFailed.next(new ValueTypeDeletionFailedEvent(valueType, false));
              }
              break;

            case FunctionalErrorCodes.VALUE_REFERENCED_BY_IMPACT:
              const value = this.valueData.values.find(v => v.id = httpInfo.tag.valueId);
              const impactsValue = this.impactData.impacts.filter(i => httpInfo.tag.impactIds.includes(i.id));
              if (value && impactsValue) {
                this.valueReferencedByImpacts.next(new ImpactsReferencingValueEvent(value, impactsValue));
                this.valueDeletionFailed.next(new ValueDeletionFailedEvent(value, false));
              }
              break;

            case FunctionalErrorCodes.VARIANT_TYPE_REFERENCED_BY_VARIANT:
              const variantType = this.variantTypeData.variantTypes.find(v => v.id = httpInfo.tag.variantTypeId);
              const variantsVariantType = this.variantData.variants.filter(i => httpInfo.tag.variantIds.includes(i.id));
              if (variantType && variantsVariantType) {
                this.variantTypeReferencedByVariants.next(new VariantsReferencingVariantType(variantType, variantsVariantType));
                this.variantTypeDeletionFailed.next(new VariantTypeDeletionFailedEvent(variantType, false));
              }
              break;

            case FunctionalErrorCodes.VARIANT_REFERENCED_BY_REQUIREMENT:
              const variant = this.variantData.variants.find(v => v.id = httpInfo.tag.variantId);
              const requirements = this.requirementData.requirements.filter(r => httpInfo.tag.requirementIds.includes(r.id));
              if (variant && requirements) {
                this.variantReferencedByRequirements.next(new RequirementsReferencingVariantEvent(variant, requirements));
                this.variantDeletionFailed.next(new VariantDeletionFailedEvent(variant, false));
              }
              break;

            case FunctionalErrorCodes.REGISTER_USERNAME_ALREADY_EXISTS:
              this.registerUsernameAlreadyExists.next(new RegisterUsernameAlreadyExistsEvent(httpInfo.tag.username));
              break;

            case FunctionalErrorCodes.REGISTER_EMAIL_ALREADY_EXISTS:
              this.registerEmailAlreadyExists.next(new RegisterEmailAlreadyExistsEvent(httpInfo.tag.email));
              break;

            case FunctionalErrorCodes.REGISTER_REALM_ALREADY_EXISTS:
              this.registerRealmAlreadyExists.next(new RegisterRealmAlreadyExistsEvent(httpInfo.tag.realm));
              break;

            default:
              this.logger.warn(this, 'Unknown functional error code: ' + httpInfo.functionalErrorCode);
              break;
          }
        } else { // Events fired in this else clause must have an explanation for not being a functional error case.
          if (httpInfo.httpStatusCode === 401) {
            // A 401 is returned by the backend if keycloak cannot login properly with the provided token.
            // This is done by keycloak if a rest call to a normal API endpoint is made (e.g. /stakeholders).
            this.authenticationFailed.next(new AuthenticationFailedEvent());
          } else if (httpInfo.httpStatusCode === 403) {
            // A 403 is returned by the backend if the user's token is not properly authorized.
            // This is done by keycloak if a rest call to a normal API endpoint is made (e.g. /stakeholders).
            this.authorizationFailed.next(new AuthorizationFailedEvent());
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
