import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {LogService} from './log.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SampleDataService} from './sample-data.service';

@Injectable({
  providedIn: 'root'
})
export abstract class RestService {

  private readonly url = environment.backendUrl;
  private readonly port = environment.backendPort;
  private readonly protocol: string = environment.protocol;
  private readonly serverUrl: string = this.protocol + '://' + this.url + ':' + this.port + '/';

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

  public readonly analysesUrl = this.serverUrl + 'analyses';
  public readonly analysesDeepCopyUrl = this.analysesUrl + '/deep-copy';

  public readonly stakeholdersUrl = this.serverUrl + 'stakeholders';

  public readonly valuesUrl = this.serverUrl + 'values';

  public readonly impactsUrl = this.serverUrl + 'impacts';

  public readonly requirementsUrl = this.serverUrl + 'requirements';

  public readonly requirementDeltasUrl = this.serverUrl + 'requirement-deltas';

  public readonly variantsUrl = this.serverUrl + 'variants';

  public readonly valuesTypesUrl = this.serverUrl + 'values/types';
  public readonly stakeholderPriorityUrl = this.serverUrl + 'stakeholders/priorities';
  public readonly stakeholderLevelsUrl = this.serverUrl + 'stakeholders/levels';

  public readonly byId = '?id=';
  public readonly byAnalysisId = '?analysisId=';
}
