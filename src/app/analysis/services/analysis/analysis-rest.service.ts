import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AnalysisDTO} from "../../model/AnalysisDTO";
import {Analysis} from "../../model/Analysis";

const httpOptions = { // Outsource!
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AnalysisRestService {

  analysisUrl = 'http://localhost:8080/analysis';//'http://79.171.179.211:443/analysis';//'http://localhost:8080/analysis';

  constructor(private http: HttpClient) {

  }

  getAnalysis(): Observable<any> {
    return this.http.get<any>(this.analysisUrl);
  }

  getAnalysisById(id: any): Observable<any> {
    return this.http.get<any>(this.analysisUrl + '/' + id);
  }

  createAnalysis(analysisDTO: AnalysisDTO): Observable<any> {
    return this.http.post(this.analysisUrl, analysisDTO, httpOptions);
  }

  updateAnalysis(analysisDTO: AnalysisDTO): Observable<any> {
    return this.http.put(this.analysisUrl, analysisDTO, httpOptions);
  }

  deleteAnalysis(analysis: Analysis): Observable<any> {
    return this.http.delete(this.analysisUrl + '/' + analysis.id);
  }
}
