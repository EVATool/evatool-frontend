import {Injectable} from '@angular/core';
import {RestService} from '../rest.service';
import {LogService} from '../log.service';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {AnalysisDto} from '../../dto/AnalysisDto';
import {SampleDataService} from '../sample-data.service';

@Injectable({
  providedIn: 'root'
})
export class AnalysisRestService extends RestService {

  constructor(protected logger: LogService,
              protected http: HttpClient,
              protected sampleData: SampleDataService) {
    super(logger, http, sampleData);
  }

  getAnalysisById(id: string): Observable<AnalysisDto> {
    const url = this.analysesUrl + '/' + id;
    this.logger.info(this, 'Http get to: ' + url);
    if (this.testing) {
      return of(this.sampleData.analysesDtoList[0]);
    } else {
      return this.http.get<AnalysisDto>(url, this.httpOptions);
    }
  }

  getAnalyses(): Observable<AnalysisDto[]> {
    const url = this.analysesUrl;
    this.logger.info(this, 'Http get to: ' + url);
    if (this.testing) {
      return of(this.sampleData.analysesDtoList);
    } else {
      return this.http.get<AnalysisDto[]>(url);
    }
  }

  deepCopy(templateAnalysisId: string, analysisDto: AnalysisDto): Observable<AnalysisDto> {
    const url = this.analysesDeepCopyUrl + '/' + templateAnalysisId;
    this.logger.info(this, 'Http post to: ' + url);
    if (this.testing) {
      this.logger.error(this, 'OPERATION NOT SUPPORTED IN TEST MODE');
      return of(this.sampleData.analysesDtoList[0]);
    } else {
      return this.http.post<AnalysisDto>(url, analysisDto, this.httpOptions);
    }
  }

  createAnalysis(analysisDto: AnalysisDto): Observable<AnalysisDto> {
    const url = this.analysesUrl;
    this.logger.info(this, "Http post to: " + url);
    if (this.testing) {
      return of(analysisDto);
    } else {
      return this.http.post<AnalysisDto>(url, analysisDto, this.httpOptions);
    }
  }

  updateAnalysis(analysisDto: AnalysisDto): Observable<AnalysisDto> {
    const url = this.analysesUrl;
    this.logger.info(this, "Http put to: " + url);
    if (this.testing) {
      return of(analysisDto);
    } else {
      return this.http.put<AnalysisDto>(url, analysisDto, this.httpOptions);
    }
  }

  deleteAnalysis(id: string): Observable<void> {
    const url = this.analysesUrl + '/' + id;
    this.logger.info(this, "Http delete to: " + url);
    if (this.testing) {
      return of(void 0);
    } else {
      return this.http.delete<void>(url);
    }
  }
}
