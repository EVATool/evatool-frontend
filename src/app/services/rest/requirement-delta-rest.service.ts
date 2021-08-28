import {Injectable} from '@angular/core';
import {LogService} from '../log.service';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest.service';
import {Observable, of} from 'rxjs';
import {RequirementDeltaDto} from '../../dto/RequirementDeltaDto';
import {SampleDataService} from '../sample-data.service';

@Injectable({
  providedIn: 'root'
})
export class RequirementDeltaRestService extends RestService {

  constructor(protected logger: LogService,
              protected http: HttpClient,
              protected sampleData: SampleDataService) {
    super(logger, http, sampleData);
  }

  getRequirementDeltasByAnalysisId(analysisId: string): Observable<RequirementDeltaDto[]> {
    const url = this.requirementDeltasUrl + this.byAnalysisId + analysisId;
    this.logger.info(this, 'Http get to: ' + url);
    if (this.testing) {
      return of(this.sampleData.requirementDeltaDtoList);
    } else {
      return this.http.get<RequirementDeltaDto[]>(url);
    }
  }

  createRequirementDelta(requirementDeltaDto: RequirementDeltaDto): Observable<RequirementDeltaDto> {
    const url = this.requirementDeltasUrl;
    this.logger.info(this, 'Http post to: ' + url);
    if (this.testing) {
      return of(requirementDeltaDto);
    } else {
      return this.http.post<RequirementDeltaDto>(url, requirementDeltaDto, this.httpOptions);
    }
  }

  updateRequirementDelta(requirementDeltaDto: RequirementDeltaDto): Observable<RequirementDeltaDto> {
    const url = this.requirementDeltasUrl;
    this.logger.info(this, 'Http put to: ' + url);
    if (this.testing) {
      return of(requirementDeltaDto);
    } else {
      return this.http.put<RequirementDeltaDto>(url, requirementDeltaDto, this.httpOptions);
    }
  }

  deleteRequirementDelta(id: string): Observable<void> {
    const url = this.requirementDeltasUrl + '/' + id;
    this.logger.info(this, 'Http delete to: ' + url);
    if (this.testing) {
      return of(void 0);
    } else {
      return this.http.delete<void>(url);
    }
  }
}
