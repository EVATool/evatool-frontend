import {Value} from '../../models/Value';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const httpOptions = { // Outsource!
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ValueRestService {

  valuesUrl = '/api/dimensions'; // Outsource!

  constructor(private http: HttpClient) {

  }

  onInit(): void {

  }

  getValues(): Observable<Value[]> {
    return this.http.get<Value[]>(this.valuesUrl);
  }

  getValueTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.valuesUrl + '/types');
  }

  createValue(dimension: Value): Observable<any> {
    return this.http.post(this.valuesUrl, dimension, httpOptions);
  }

  updateValue(dimension: Value): Observable<any> {
    return this.http.put(this.valuesUrl, dimension, httpOptions);
  }

  deleteValue(dimension: Value): Observable<any> {
    return this.http.delete(this.valuesUrl + '/' + dimension.entityId);
  }
}