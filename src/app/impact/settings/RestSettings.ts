import {HttpHeaders} from '@angular/common/http';

export class RestSettings {

  public static readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private static readonly useLocalhost = false;

  private static readonly serverIp = '79.171.179.211';
  private static readonly serverPort = '443';
  private static readonly baseUrl = `http://${RestSettings.serverIp}:${RestSettings.serverPort}`;

  public static readonly valuesUrl = RestSettings.baseUrl + '/values';
  public static readonly valueTypesUrl = RestSettings.valuesUrl + '/types';
  public static readonly stakeholdersUrl = RestSettings.baseUrl + '/stakeholders';
  public static readonly analysesUrl = RestSettings.baseUrl + '/analysis';
  public static readonly impactsUrl = RestSettings.baseUrl + '/impacts';

  public static readonly impactReferencedUrl = RestSettings.baseUrl + '/requirements/referenced-by-impact';
}
