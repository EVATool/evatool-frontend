
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Stakeholder} from '../model/Stakeholder';
import {StakeholderDTO} from '../model/StakeholderDTO';

const httpOptions = { // Outsource!
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class StakeholderRestService {

  stakeholderUrl = 'http://79.171.179.211:443/stakeholders'; // Outsource!

  constructor(private http: HttpClient) {

  }

  onInit(): void {

  }

  getStakeholders(): Observable<any> {
    return this.http.get<any>(this.stakeholderUrl);
  }

  getStakeholdersById(id: any): Observable<any> {
    return this.http.get<any>(this.stakeholderUrl + '/' + id);
  }

  createStakeholder(stakeholderDTO: StakeholderDTO): Observable<any> {
    return this.http.post(this.stakeholderUrl, stakeholderDTO, httpOptions);
  }

  updateStakeholder(stakeholderDTO: StakeholderDTO): Observable<any> {
    return this.http.put(this.stakeholderUrl, stakeholderDTO, httpOptions);
  }

  deleteStakeholder(stakeholder: Stakeholder): Observable<any> {
    return this.http.delete(this.stakeholderUrl + '/' + stakeholder.id);
  }
}
