import {RestSettings} from '../../settings/RestSettings';
import {StakeholderDto} from '../../dtos/StakeholderDto';
import {LogService} from '../../../shared/services/log.service';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SampleDataService} from "../../spec/sample-data.service";

@Injectable({
  providedIn: 'root'
})
export class StakeholderRestService {

  constructor(
    private logger: LogService,
    private http: HttpClient,
    protected data: SampleDataService) {
  }

  onInit(): void {

  }

  getStakeholders(): Observable<StakeholderDto[]> { // TODO get by id when analysis rest call is available.
    this.logger.info(this, 'Get all Stakeholders');
    if (this.data.offline) {
      return of(this.data.dummyStakeholderDtos);
    } else {
      return this.http.get<StakeholderDto[]>(RestSettings.stakeholdersUrl);
    }
  }
}
