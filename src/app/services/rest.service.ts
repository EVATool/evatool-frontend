import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {LogService} from './log.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SampleDataService} from './sample-data.service';

@Injectable({
  providedIn: 'root'
})
export abstract class RestService {

  private readonly backendUrl = environment.serverProtocol + '://' + environment.serverAddr + ':' + environment.backendPort + '/';

  protected readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  protected constructor(protected logger: LogService,
                        protected http: HttpClient,
                        protected sampleData: SampleDataService) {
  }

  public testing = environment.testing;

  public readonly analysesUrl = this.backendUrl + 'analyses';
  public readonly analysesDeepCopyUrl = this.analysesUrl + '/deep-copy';

  public readonly stakeholdersUrl = this.backendUrl + 'stakeholders';

  public readonly valuesUrl = this.backendUrl + 'values';

  public readonly impactsUrl = this.backendUrl + 'impacts';

  public readonly requirementsUrl = this.backendUrl + 'requirements';

  public readonly requirementDeltasUrl = this.backendUrl + 'requirement-deltas';

  public readonly variantsUrl = this.backendUrl + 'variants';

  public readonly valuesTypesUrl = this.backendUrl + 'values/types';
  public readonly stakeholderPriorityUrl = this.backendUrl + 'stakeholders/priorities';
  public readonly stakeholderLevelsUrl = this.backendUrl + 'stakeholders/levels';

  public readonly importAnalysesUrl = this.backendUrl + 'import/analyses';
  public readonly exportAnalysesUrl = this.backendUrl + 'export/analyses';

  public readonly byId = '?id=';
  public readonly byAnalysisId = '?analysisId=';
  public readonly analysisIds = '?analysisIds=';
  public readonly filename = 'filename=';

  public readonly authLoginUrl = this.backendUrl + 'auth/login/token';
  public readonly authRefreshLoginUrl = this.backendUrl + 'auth/login/refresh-token';
  public readonly authRegisterUserUrl = this.backendUrl + 'auth/register/user';
  public readonly authRegisterRealmUrl = this.backendUrl + 'auth/register/realm';

  public getAuthManageRealmUrl(realm: string): string {
    return environment.serverProtocol + '://' + environment.serverAddr + ':' + environment.authPort + '/auth/admin/master/console/#/realms/' + realm;
  }
}
