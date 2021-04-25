import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Impact} from "../../models/Impact";
import {RestService} from "../../../shared/services/rest.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ImpactRestService {

  constructor(private http: HttpClient) {

  }
  getImpacts(id: string): Observable<Impact> {
    return this.http.get<any>(RestService.getImpactsURL() + '?analysisId=' + id);
  }
}
