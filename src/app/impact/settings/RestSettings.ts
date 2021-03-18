import { HttpHeaders } from '@angular/common/http';

export class RestSettings {

  public static readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private static readonly serverIp = '79.171.179.211';
  private static readonly serverPort = '443';
  private static readonly baseUrl = `http://${RestSettings.serverIp}:${RestSettings.serverPort}/dimensions`;

  public static readonly dimensionsUrl = 'http://79.171.179.211:443/dimensions';
  public static readonly stakeholdersUrl = 'http://79.171.179.211:443/stakeholders';
  public static readonly analysesUrl = 'http://79.171.179.211:443/analysis';
  public static readonly impactsUrl = 'http://79.171.179.211:443/impacts';
}