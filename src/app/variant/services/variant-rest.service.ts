
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Variant} from "../models/Variant";

const httpOptions = { // Outsource!
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class VariantRestService {

  dimensionsUrl = '/variants'; // Outsource!

  constructor(private http: HttpClient) {

  }

  onInit(): void {

  }


  save(variant: Variant): void {
    //call server
  }
}
