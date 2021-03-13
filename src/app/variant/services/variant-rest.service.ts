
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Variant} from '../models/Variant';
import {map} from 'rxjs/operators';

const httpOptions = { // Outsource!
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class VariantRestService {

  variantUrl = 'http://localhost:8080/variants/'; // Outsource!

  constructor(private http: HttpClient) {

  }

  onInit(): void {

  }


  save(variant: Variant): void {
    // call server
  }


  getVariants(): void {

    console.log("methode getVariants");
    this.http.get<Variant[]>(this.variantUrl).pipe(map((result) => {
      console.log(result);
      return result;
    }));



    //return this.http.get<Variant[]>(this.variantUrl);


  }
}
