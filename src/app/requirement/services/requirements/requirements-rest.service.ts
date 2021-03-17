import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Requirements} from '../../models/Requirements';

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

  constructor(private http: HttpClient) {

  }

  getRequirements(): Observable<any> {
    return this.http.get<any>(this.analysisUrl);
  }

  createRequirements(requirement: Requirements): Observable<any> {
    return this.http.post(this.analysisUrl, requirement, httpOptions);
  }
}
