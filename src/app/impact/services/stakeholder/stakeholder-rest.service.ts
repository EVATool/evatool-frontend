import { LogService } from './../../settings/log.service';
import { RestSettings } from '../../settings/RestSettings';
import { StakeholderDto } from '../../dtos/StakeholderDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StakeholderRestService {

  constructor(
    private logger: LogService,
    private http: HttpClient) {

  }

  onInit(): void {

  }

  getStakeholders(): Observable<StakeholderDto[]> {
    this.logger.info(this, 'Get all Stakeholders');
    return this.http.get<StakeholderDto[]>(RestSettings.stakeholdersUrl);
  }
}
