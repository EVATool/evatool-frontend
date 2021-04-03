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

  // analysisUrl = 'http://79.171.179.211:443/requirements'; // Outsource!
  requirmentUrl = 'http://localhost:8080/requirements'; // Outsource!
  // impactsUrl = 'http://79.171.179.211:443/impacts'; // Outsource!
  impactsUrl = 'http://localhost:8080/requirements/impacts'; // Outsource!

  constructor(private http: HttpClient) {

  }

  getRequirements(id: string): Observable<Requirements[]> {
    return this.http.get<Requirements[]>(this.requirmentUrl + '?analysisId=' + id);
  }
  getImpacts(): Observable<Impact> {
    return this.http.get<any>(this.impactsUrl);
  }
  createRequirements(requirement: Requirements): Observable<any> {
    return this.http.post(this.requirmentUrl, requirement, httpOptions);
  }
  updateRequirements(requirement: Requirements): Observable<any> {
    return this.http.put(this.requirmentUrl, requirement, httpOptions);
  }

  deleteRequirements(requirements: Requirements): Observable<any> {
    return this.http.delete(this.requirmentUrl + '/' + requirements.rootEntityId);
  }
}
