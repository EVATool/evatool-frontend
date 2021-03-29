import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Requirements} from '../../models/Requirements';
import {Impact} from "../../models/Impact";

const httpOptions = { // Outsource!
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RequirementsRestService {

  analysisUrl = 'http://localhost:8080/requirements'; // Outsource!
  impactsUrl = 'http://localhost:8080/requirements/impacts'; // Outsource!

  constructor(private http: HttpClient) {

  }

  getRequirements(): Observable<Requirements[]> {
    return this.http.get<Requirements[]>(this.analysisUrl);
  }
  getImpacts(): Observable<Impact> {
    return this.http.get<any>(this.impactsUrl);
  }
  createRequirements(requirement: Requirements): Observable<any> {
    return this.http.post(this.analysisUrl, requirement, httpOptions);
  }
  updateRequirements(requirement: Requirements): Observable<any> {
    return this.http.put(this.analysisUrl, requirement, httpOptions);
  }
}
