import {TestBed} from '@angular/core/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {StakeholderRestService} from './stakeholder-rest.service';
import {Injectable} from '@angular/core';
import {LogService} from '../../shared/services/log.service';
import {StakeholderSampleDataService} from './spec/stakeholder-sample-data.service';
import {Observable, of} from 'rxjs';
import {StakeholderDTO} from '../model/StakeholderDTO';
import {Stakeholder} from '../model/Stakeholder';


@Injectable({
  providedIn: 'root'
})
export class MockedStakeholderRestService extends StakeholderRestService {

  constructor(
    logger: LogService,
    http: HttpClient,
    private sampleData: StakeholderSampleDataService) {
    super(http);
  }

  getStakeholders(): Observable<any> {
    return of(this.sampleData.getdummyStakeholderDTOs());
  }

  getStakeholdersByAnalysisId(analysisId: any): Observable<any> {
    return of(this.sampleData.getdummyStakeholderDTOs());
  }

  getStakeholdersById(id: any): Observable<any> {
    return of(this.sampleData.getdummyStakeholderDTOs());
  }

  createStakeholder(stakeholderDTO: StakeholderDTO): Observable<any> {
    return of(this.sampleData.getdummyStakeholderDTO());
  }

  updateStakeholder(stakeholderDTO: StakeholderDTO): Observable<any> {
    return of(this.sampleData.getdummyStakeholderDTO());
  }

  deleteStakeholder(stakeholder: Stakeholder): Observable<any> {
    this.sampleData.delete();
    return of(this.sampleData.getdummyStakeholder());
  }
}
