import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Variants} from "../../models/Variants";
import {RestService} from "../../../shared/services/rest.service";

@Injectable({
  providedIn: 'root'
})
export class VariantsRestService {

  constructor(private http: HttpClient) {

  }
  getVariants(id: string): Observable<Variants> {
    return this.http.get<any>(RestService.getVariantsURL() + '?analysisId=' + id);
  }
}
