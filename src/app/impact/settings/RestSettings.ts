import { HttpHeaders } from '@angular/common/http';

export class RestSettings {

  public static readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // WRONG URLS!
  public static readonly dimensionsUrl = '/api/dimensions';
  public static readonly stakeholdersUrl = '/api/stakeholders';
  public static readonly analysesUrl = '/api/analysis';
  public static readonly impactsUrl = '/api/impacts';
}