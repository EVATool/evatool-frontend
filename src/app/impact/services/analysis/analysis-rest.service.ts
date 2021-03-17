import { Observable } from 'rxjs';
import { AnalysisDto } from './../../dtos/AnalysisDto';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = { // Outsource!
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AnalysisRestService {

  analysesUrl = '/api/analysis'; // Outsource!

  constructor(private http: HttpClient) {

  }

  onInit() {

  }

  getDimensions(): Observable<AnalysisDto[]> {
    return this.http.get<AnalysisDto[]>(this.analysesUrl);
  }
}
