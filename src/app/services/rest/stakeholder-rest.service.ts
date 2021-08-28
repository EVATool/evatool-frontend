import {Injectable} from '@angular/core';
import {LogService} from '../log.service';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest.service';
import {Observable, of} from 'rxjs';
import {StakeholderDto} from '../../dto/StakeholderDto';
import {SampleDataService} from '../sample-data.service';

@Injectable({
  providedIn: 'root'
})
export class StakeholderRestService extends RestService {

  constructor(protected logger: LogService,
              protected http: HttpClient,
              protected sampleData: SampleDataService) {
    super(logger, http, sampleData);
  }

  getStakeholdersByAnalysisId(analysisId: string): Observable<StakeholderDto[]> {
    const url = this.stakeholdersUrl + this.byAnalysisId + analysisId;
    this.logger.info(this, 'Http get to: ' + url);
    if (this.testing) {
      return of(this.sampleData.stakeholderDtoList);
    } else {
      return this.http.get<StakeholderDto[]>(url);
    }
  }

  createStakeholder(stakeholderDto: StakeholderDto): Observable<StakeholderDto> {
    const url = this.stakeholdersUrl;
    this.logger.info(this, 'Http post to: ' + url);
    if (this.testing) {
      return of(stakeholderDto);
    } else {
      return this.http.post<StakeholderDto>(url, stakeholderDto, this.httpOptions);
    }
  }

  updateStakeholder(stakeholderDto: StakeholderDto): Observable<StakeholderDto> {
    const url = this.stakeholdersUrl;
    this.logger.info(this, 'Http put to: ' + url);
    if (this.testing) {
      return of(stakeholderDto);
    } else {
      return this.http.put<StakeholderDto>(url, stakeholderDto, this.httpOptions);
    }
  }

  deleteStakeholder(id: string): Observable<void> {
    const url = this.stakeholdersUrl + '/' + id;
    this.logger.info(this, 'Http delete to: ' + url);
    if (this.testing) {
      return of(void 0);
    } else {
      return this.http.delete<void>(url);
    }
  }

  getStakeholderPriorities(): Observable<string[]> {
    const url = this.stakeholderPriorityUrl;
    this.logger.info(this, 'Http get to: ' + url);
    if (this.testing) {
      return of(this.sampleData.stakeholderPriorities);
    } else {
      return this.http.get<string[]>(url);
    }
  }

  getStakeholderLevels(): Observable<string[]> {
    const url = this.stakeholderLevelsUrl;
    this.logger.info(this, 'Http get to: ' + url);
    if (this.testing) {
      return of(this.sampleData.stakeholderLevels);
    } else {
      return this.http.get<string[]>(url);
    }
  }
}
