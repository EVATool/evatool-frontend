import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AnalysisDTO} from "../../model/AnalysisDTO";

const httpOptions = { // Outsource!
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AnalysisRestService {

  analysisUrl = 'http://79.171.179.211:443/analysis'; // Outsource!

  constructor(private http: HttpClient) {

  }

  getVariants(): Observable<any> {
    return this.http.get<any>(this.analysisUrl);
  }

  createAnalysis(analysisDTO: AnalysisDTO): Observable<any> {
    return this.http.post(this.analysisUrl, analysisDTO, httpOptions);
  }
}
