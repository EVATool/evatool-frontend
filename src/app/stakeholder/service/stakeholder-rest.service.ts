
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Stakeholder} from '../model/Stakeholder';
import {StakeholderDTO} from '../model/StakeholderDTO';
import {RestService} from '../../shared/services/rest.service';

const httpOptions = { // Outsource!
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class StakeholderRestService {

  constructor(private http: HttpClient) {

  }

  onInit(): void {

  }

  getStakeholders(): Observable<any> {
    return this.http.get<any>(RestService.getStakeholdersURL());
  }

  getStakeholdersByAnalysisId(analysisId: any): Observable<any> {
    return this.http.get<any>(RestService.getStakeholdersURL() + '?analysisId=' + analysisId);
  }

  getStakeholdersById(id: any): Observable<any> {
    return this.http.get<any>(RestService.getStakeholdersURL() + '/' + id);
  }

  createStakeholder(stakeholderDTO: StakeholderDTO): Observable<any> {
    return this.http.post(RestService.getStakeholdersURL(), stakeholderDTO, httpOptions);
  }

  updateStakeholder(stakeholderDTO: StakeholderDTO): Observable<any> {
    return this.http.put(RestService.getStakeholdersURL(), stakeholderDTO, httpOptions);
  }

  deleteStakeholder(stakeholder: Stakeholder): Observable<any> {
    return this.http.delete(RestService.getStakeholdersURL() + '/' + stakeholder.id);
  }
}
