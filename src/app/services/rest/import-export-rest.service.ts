import {Injectable} from '@angular/core';
import {RestService} from '../rest.service';
import {LogService} from '../log.service';
import {HttpClient} from '@angular/common/http';
import {SampleDataService} from '../sample-data.service';
import {Observable, of} from 'rxjs';
import {AnalysisDto} from '../../dto/AnalysisDto';

@Injectable({
  providedIn: 'root'
})
export class ImportExportRestService extends RestService {

  constructor(protected logger: LogService,
              protected http: HttpClient,
              protected sampleData: SampleDataService) {
    super(logger, http, sampleData);
  }

  importAnalyses(importAnalyses: string): Observable<void> {
    const url = this.importAnalysesUrl;
    this.logger.info(this, 'Http get to: ' + url);
    return this.http.post<void>(url, importAnalyses, this.httpOptions);
  }

  exportAnalyses(analysisIds: string[], filename: string): Observable<string> {
    const url = this.exportAnalysesUrl + this.analysisIds + analysisIds.join(',') + '&' + this.filename + filename;
    this.logger.info(this, 'Http get to: ' + url);
    return this.http.get<string>(url, this.httpOptions);
  }
}
