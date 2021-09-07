import {Injectable} from '@angular/core';
import {RestService} from './rest.service';
import {LogService} from '../log.service';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ValueDto} from '../../dto/ValueDto';
import {SampleDataService} from '../sample-data.service';

@Injectable({
  providedIn: 'root'
})
export class ValueRestService extends RestService {

  constructor(protected logger: LogService,
              protected http: HttpClient,
              protected sampleData: SampleDataService) {
    super(logger, http, sampleData);
  }

  getValuesByAnalysisId(analysisId: string): Observable<ValueDto[]> {
    const url = this.valuesUrl + this.byAnalysisId + analysisId;
    this.logger.debug(this, 'Http get to: ' + url);
    if (this.testing) {
      return of(this.sampleData.valueDtoList);
    } else {
      return this.http.get<ValueDto[]>(url);
    }
  }

  createValue(valueDto: ValueDto): Observable<ValueDto> {
    const url = this.valuesUrl;
    this.logger.debug(this, 'Http post to: ' + url);
    if (this.testing) {
      return of(valueDto);
    } else {
      return this.http.post<ValueDto>(url, valueDto, this.httpOptions);
    }
  }

  updateValue(valueDto: ValueDto): Observable<ValueDto> {
    const url = this.valuesUrl;
    this.logger.debug(this, 'Http put to: ' + url);
    if (this.testing) {
      return of(valueDto);
    } else {
      return this.http.put<ValueDto>(url, valueDto, this.httpOptions);
    }
  }

  deleteValue(id: string): Observable<void> {
    const url = this.valuesUrl + '/' + id;
    this.logger.debug(this, 'Http delete to: ' + url);
    if (this.testing) {
      return of(void 0);
    } else {
      return this.http.delete<void>(url);
    }
  }

  getValueTypes(): Observable<string[]> {
    const url = this.valuesTypesUrl;
    this.logger.debug(this, 'Http get to: ' + url);
    if (this.testing) {
      return of(this.sampleData.valueTypes);
    } else {
      return this.http.get<string[]>(url);
    }
  }
}
