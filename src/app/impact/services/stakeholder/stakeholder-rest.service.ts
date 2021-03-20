import { RestSettings } from '../../settings/RestSettings';
import { StakeholderDto } from '../../dtos/StakeholderDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StakeholderRestService {

  constructor(private http: HttpClient) {

  }

  onInit(): void {

  }

  getStakeholders(): Observable<StakeholderDto[]> {
    return this.http.get<StakeholderDto[]>(RestSettings.stakeholdersUrl);
  }

  createStakeholder(stakeholderDto: StakeholderDto): Observable<any> {
    return this.http.post(RestSettings.stakeholdersUrl, stakeholderDto, RestSettings.httpOptions);
  }

  updateStakeholder(stakeholderDto: StakeholderDto): Observable<any> {
    return this.http.put(RestSettings.stakeholdersUrl, stakeholderDto, RestSettings.httpOptions);
  }

  deleteStakeholder(stakeholderDto: StakeholderDto): Observable<any> {
    return this.http.delete(RestSettings.stakeholdersUrl + '/' + stakeholderDto.rootEntityID);
  }
}
