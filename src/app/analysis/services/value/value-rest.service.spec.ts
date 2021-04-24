import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';

import {ValueRestService} from './value-rest.service';
import {Injectable} from '@angular/core';
import {LogService} from '../../../shared/services/log.service';
import {ValuesSampleDataService} from '../spec-values/values-sample-data.service';
import {Observable, of} from 'rxjs';
import {ValueDTO} from '../../model/ValueDTO';

@Injectable({
  providedIn: 'root'
})
export class MockedValueRestService extends ValueRestService {

  constructor(
    logger: LogService,
    http: HttpClient,
    private sampleData: ValuesSampleDataService) {
    super(http);
  }

  getValuesByAnalysisId(id: any): Observable<any> {
    return of(this.sampleData.getDummyValuesDTOs());
  }

  createValue(valueDTO: ValueDTO): Observable<any> {
    return of(this.sampleData.getDummyValueDTO());
  }

  updateValue(valueDTO: ValueDTO): Observable<any> {
    return of(this.sampleData.getDummyValue());
  }

  deleteValue(value: ValueDTO): Observable<any> {
    this.sampleData.delete();
    return of(this.sampleData.getDummyValue());
  }
}
