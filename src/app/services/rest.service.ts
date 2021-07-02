import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {LogService} from './log.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SampleDataService} from './sample-data.service';

@Injectable({
  providedIn: 'root'
})
export abstract class RestService {

  private readonly backendUrl = environment.backendProtocol + '://' + environment.backendAddr + ':' + environment.backendPort + '/';

  protected readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  protected readonly httpAuthOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
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

  public readonly byId = '?id=';
  public readonly byAnalysisId = '?analysisId=';

  protected getAuthUrl(authRealm: string): string {
    return environment.authProtocol + '://' + environment.authAddr + ':' + environment.authPort + '/auth/realms/' + authRealm + '/protocol/openid-connect/token';
  }
}
