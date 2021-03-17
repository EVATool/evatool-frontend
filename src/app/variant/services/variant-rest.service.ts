
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Variant} from '../models/Variant';
import {VariantDTO} from '../models/VariantDTO';

const httpOptions = { // Outsource!
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class VariantRestService {

  variantUrl = 'http://79.171.179.211:443/variants'; // Outsource!

  constructor(private http: HttpClient) {

  }

  onInit(): void {

  }

  getVariants(): Observable<any> {
    return this.http.get<any>(this.variantUrl);
  }

  getVariantsById(id: any): Observable<any> {
    return this.http.get<any>(this.variantUrl + '/' + id);
  }

  createVariants(variantDTO: VariantDTO): Observable<any> {
    return this.http.post(this.variantUrl, variantDTO, httpOptions);
  }

  updateVariants(variantDTO: VariantDTO): Observable<any> {
    return this.http.put(this.variantUrl, variantDTO, httpOptions);
  }

  deleteVariants(variant: Variant): Observable<any> {
    return this.http.delete(this.variantUrl + '/' + variant.id);
  }
}
