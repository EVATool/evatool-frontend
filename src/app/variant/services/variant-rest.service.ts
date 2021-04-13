import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {VariantDTO} from '../models/VariantDTO';
import {RestService} from '../../shared/services/rest.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class VariantRestService {

  constructor(private http: HttpClient){}


  getVariants(): Observable<any> {
    return this.http.get<any>(RestService.getVariantsURL());
  }

  getVariantsById(id: any): Observable<any> {
    return this.http.get<any>(RestService.getVariantsURL() + '/' + id);
  }

  getVariantsByAnalysisId(id: any): Observable<any> {
    return this.http.get<any>(RestService.getVariantsURL() + '?analysisId=' + id);
  }

  createVariants(variantDTO: VariantDTO): Observable<any> {
    return this.http.post(RestService.getVariantsURL(), variantDTO, httpOptions);
  }

  updateVariants(variantDTO: VariantDTO): Observable<any> {
    return this.http.put(RestService.getVariantsURL(), variantDTO, httpOptions);
  }

  deleteVariants(id: string): Observable<any> {
    return this.http.delete(RestService.getVariantsURL() + '/' + id);
  }

}
