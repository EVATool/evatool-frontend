import {Injectable} from '@angular/core';
import {RestService} from './rest.service';
import {LogService} from '../log.service';
import {HttpClient} from '@angular/common/http';
import {SampleDataService} from '../sample-data.service';
import {Observable, of} from 'rxjs';
import {ValueTypeDto} from '../../dto/ValueTypeDto';

@Injectable({
  providedIn: 'root'
})
export class ValueTypeRestService extends RestService {

  constructor(protected logger: LogService,
              protected http: HttpClient,
              protected sampleData: SampleDataService) {
    super(logger, http, sampleData);
  }

  getValueTypesByAnalysisId(analysisId: string): Observable<ValueTypeDto[]> {
    const url = this.valueTypesUrl + this.byAnalysisId + analysisId;
    this.logger.debug(this, 'Http get to: ' + url);
    if (this.testing) {
      return of(this.sampleData.valueTypeDtoList);
    } else {
      return this.http.get<ValueTypeDto[]>(url);
    }
  }

  createValueType(valueTypeDto: ValueTypeDto): Observable<ValueTypeDto> {
    const url = this.valueTypesUrl;
    this.logger.debug(this, 'Http post to: ' + url);
    if (this.testing) {
      return of(valueTypeDto);
    } else {
      return this.http.post<ValueTypeDto>(url, valueTypeDto, this.httpOptions);
    }
  }

  updateValueType(valueTypeDto: ValueTypeDto): Observable<ValueTypeDto> {
    const url = this.valueTypesUrl;
    this.logger.debug(this, 'Http put to: ' + url);
    if (this.testing) {
      return of(valueTypeDto);
    } else {
      return this.http.put<ValueTypeDto>(url, valueTypeDto, this.httpOptions);
    }
  }

  deleteValueType(id: string): Observable<void> {
    const url = this.valueTypesUrl + '/' + id;
    this.logger.debug(this, 'Http delete to: ' + url);
    if (this.testing) {
      return of(void 0);
    } else {
      return this.http.delete<void>(url);
    }
  }
}
