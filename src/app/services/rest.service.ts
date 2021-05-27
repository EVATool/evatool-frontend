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

  protected readonly testing = environment.testing;

  protected readonly analysesUrl = this.serverUrl + 'analyses';
  protected readonly analysesDeepCopyUrl = this.analysesUrl + '/deep-copy';
  protected readonly stakeholdersUrl = this.serverUrl + 'stakeholders';
  protected readonly valuesUrl = this.serverUrl + 'values';
  protected readonly impactsUrl = this.serverUrl + 'impacts';
  protected readonly requirementsUrl = this.serverUrl + 'requirements';
  protected readonly requirementDeltasUrl = this.serverUrl + 'requirement-deltas';
  protected readonly variantsUrl = this.serverUrl + 'variants';

  protected readonly valuesTypesUrl = this.serverUrl + 'values/types';
  protected readonly stakeholderPriorityUrl = this.serverUrl + 'stakeholders/priorities';
  protected readonly stakeholderLevelsUrl = this.serverUrl + 'stakeholders/levels';

  protected readonly byId = '?id=';
  protected readonly byAnalysisId = '?analysisId=';
}
