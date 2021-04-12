import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AnalysisDTO} from "../../model/AnalysisDTO";
import {Analysis} from "../../model/Analysis";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ValueDTO} from "../../model/ValueDTO";
import {Value} from "../../model/Value";

const httpOptions = { // Outsource!
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ValueRestService {

  valueUrl = 'http://79.171.179.211:443/values';

  constructor(private http: HttpClient) {
  }

  getValues(): Observable<any> {
    return this.http.get<any>(this.valueUrl);
  }

  getValueById(id: any): Observable<any> {
    return this.http.get<any>(this.valueUrl + '/' + id);
  }

  createValue(valueDTO: ValueDTO): Observable<any> {
    return this.http.post(this.valueUrl, valueDTO, httpOptions);
  }

  updateValue(valueDTO: ValueDTO): Observable<any> {
    return this.http.put(this.valueUrl, valueDTO, httpOptions);
  }

  deleteValue(value: Value): Observable<any> {
    console.log(value.id);
    return this.http.delete(this.valueUrl + '/' + value.id);
  }

  getValuesByAnalysisId(id: any): Observable<any> {
    return this.http.get<any>(this.valueUrl + '?analysisId=' + id);
  }
}
