import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AnalysisDTO} from "../../model/AnalysisDTO";
import {Analysis} from "../../model/Analysis";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ValueDTO} from "../../model/ValueDTO";
import {Value} from "../../model/Value";
import {RestService} from '../../../shared/services/rest.service';

const httpOptions = { // Outsource!
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ValueRestService {

  constructor(private http: HttpClient) {
  }

  getValues(): Observable<any> {
    return this.http.get<any>(RestService.getValuesURL());
  }

  getValueById(id: any): Observable<any> {
    return this.http.get<any>(RestService.getValuesURL() + '/' + id);
  }

  createValue(valueDTO: ValueDTO): Observable<any> {
    return this.http.post(RestService.getValuesURL(), valueDTO, httpOptions);
  }

  updateValue(valueDTO: ValueDTO): Observable<any> {
    return this.http.put(RestService.getValuesURL(), valueDTO, httpOptions);
  }

  deleteValue(value: Value): Observable<any> {
    console.log(value.id);
    return this.http.delete(RestService.getValuesURL() + '/' + value.id);
  }

  getValuesByAnalysisId(id: any): Observable<any> {
    return this.http.get<any>(RestService.getValuesURL() + '?analysisId=' + id);
  }
}
