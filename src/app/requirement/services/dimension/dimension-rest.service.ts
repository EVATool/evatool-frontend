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
export class DimensionRestService {

  dimensionsUrl = '/api/dimensions'; // Outsource!

  constructor(private http: HttpClient) {

  }

  onInit(): void {

  }

  getDimensions(): Observable<Value[]> {
    return this.http.get<Value[]>(this.dimensionsUrl);
  }

  getDimensionTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.dimensionsUrl + '/types');
  }

  createDimension(dimension: Value): Observable<any> {
    return this.http.post(this.dimensionsUrl, dimension, httpOptions);
  }

  updateDimension(dimension: Value): Observable<any> {
    return this.http.put(this.dimensionsUrl, dimension, httpOptions);
  }

  deleteDimension(dimension: Value): Observable<any> {
    return this.http.delete(this.dimensionsUrl + '/' + dimension.entityId);
  }
}
