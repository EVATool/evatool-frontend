import {StakeholderDto} from '../../dtos/StakeholderDto';
import {LogService} from '../../../shared/services/log.service';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SampleDataService} from "../../spec/sample-data.service";
import {MockableService} from "../mockable.service";
import {RestService} from "../../../shared/services/rest.service";

@Injectable({
  providedIn: 'root'
})
export class StakeholderRestService extends MockableService {

  constructor(
    private logger: LogService,
    private http: HttpClient,
    protected data: SampleDataService) {
    super();
  }

  onInit(): void {

  }

  getStakeholders(analysisId: string): Observable<StakeholderDto[]> {
    this.logger.info(this, 'Get all Stakeholders');
    if (this.useDummyData(this.data.offline)) {
      return of(this.data.dummyStakeholderDtos);
    } else {
      return this.http.get<StakeholderDto[]>(RestService.getStakeholdersURL() + "?analysisId=" + analysisId);
    }
  }

  getStakeholdersByAnalysisId(analysisId: string): Observable<StakeholderDto[]> {
    this.logger.info(this, 'Get all Stakeholders');
    if (this.useDummyData(this.data.offline)) {
      return of(this.data.dummyStakeholderDtos);
    } else {
      return this.http.get<StakeholderDto[]>(RestService.getStakeholdersURL() + "?analysisId=" + analysisId);
    }
  }
}
