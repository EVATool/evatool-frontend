import { StakeholderDto } from './../../dtos/StakeholderDto';
import { Observable } from 'rxjs';
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
export class StakeholderRestService {

  stakeholdersUrl = '/api/dimensions'; // Outsource!

  constructor(private http: HttpClient) {

  }

  onInit(): void {

  }

  getDimensions(): Observable<StakeholderDto[]> {
    return this.http.get<StakeholderDto[]>(this.stakeholdersUrl);
  }

  createDimension(stakeholderDto: StakeholderDto): Observable<any> {
    return this.http.post(this.stakeholdersUrl, stakeholderDto, httpOptions);
  }

  updateDimension(stakeholderDto: StakeholderDto): Observable<any> {
    return this.http.put(this.stakeholdersUrl, stakeholderDto, httpOptions);
  }

  deleteDimension(stakeholderDto: StakeholderDto): Observable<any> {
    return this.http.delete(this.stakeholdersUrl + '/' + stakeholderDto.id);
  }
}
