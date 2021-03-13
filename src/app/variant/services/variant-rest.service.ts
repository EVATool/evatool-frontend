
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Variant} from '../models/Variant';
import {map} from 'rxjs/operators';
import {Dimension} from '../../impact/models/Dimension';
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

  variantUrl = 'http://localhost:8080/variants'; // Outsource!

  constructor(private http: HttpClient) {

  }

  onInit(): void {

  }


  save(variant: Variant): void {
    // call server
  }


  getVariants(): Observable<any> {
    return this.http.get<any>(this.variantUrl);
  }

  createVariants(variantDTO: VariantDTO): Observable<any> {
    return this.http.post(this.variantUrl, variantDTO, httpOptions);
  }

  deleteVariants(variant: Variant): Observable<any> {
    return this.http.delete(this.variantUrl + '/' + variant.id);
  }
}
