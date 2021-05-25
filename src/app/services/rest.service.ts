import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {LogService} from "./log.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SampleDataService} from "./sample-data.service";

@Injectable({
  providedIn: 'root'
})
export abstract class RestService {

  protected readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  protected constructor(protected logger: LogService,
                        protected http: HttpClient,
                        protected sampleData: SampleDataService) {
  }

  // Some kind of "useMockData" variable

  //private static readonly url = environment.backendUrl;
  //private static readonly port = environment.backendPort;
  //private static readonly serverURL: string = 'http://' + RestService.url + ':' + RestService.port + '/';

  //private readonly serverUrl = 'http://79.171.179.211:443/';
  private readonly serverUrl = 'http://localhost:8080/';
  protected readonly testing = false;

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

  protected readonly byId = '?id='
  protected readonly byAnalysisId = '?analysisId='
}
