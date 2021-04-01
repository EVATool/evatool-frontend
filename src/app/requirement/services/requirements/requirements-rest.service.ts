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

  analysisUrl = 'http://79.171.179.211:443/requirements'; // Outsource!
  impactsUrl = 'http://79.171.179.211:443/impacts'; // Outsource!

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
