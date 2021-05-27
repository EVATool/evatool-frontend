import {Injectable} from '@angular/core';
import {LogService} from '../log.service';
import {HttpClient} from '@angular/common/http';
import {RestService} from '../rest.service';
import {Observable, of} from 'rxjs';
import {ImpactDto} from '../../dto/ImpactDto';
import {SampleDataService} from '../sample-data.service';

@Injectable({
  providedIn: 'root'
})
export class ImpactRestService extends RestService {

  constructor(protected logger: LogService,
              protected http: HttpClient,
              protected sampleData: SampleDataService) {
    super(logger, http, sampleData);
  }

  getImpactsByAnalysisId(analysisId: string): Observable<ImpactDto[]> {
    const url = this.impactsUrl + this.byAnalysisId + analysisId;
    this.logger.info(this, "Http get to: " + url);
    if (this.testing) {
      return of(this.sampleData.impactDtoList);
    } else {
      return this.http.get<ImpactDto[]>(url);
    }
  }

  createImpact(impactDto: ImpactDto): Observable<ImpactDto> {
    const url = this.impactsUrl;
    this.logger.info(this, "Http post to: " + url);
    if (this.testing) {
      impactDto.id = '1337';
      impactDto.prefixSequenceId = '12388u'
      return of(impactDto);
    } else {
      return this.http.post<ImpactDto>(url, impactDto, this.httpOptions);
    }
  }

  updateImpact(impactDto: ImpactDto): Observable<ImpactDto> {
    const url = this.impactsUrl;
    this.logger.info(this, "Http put to: " + url);
    if (this.testing) {
      return of(impactDto);
    } else {
      return this.http.put<ImpactDto>(url, impactDto, this.httpOptions);
    }
  }

  deleteImpact(id: string): Observable<void> {
    const url = this.impactsUrl + '/' + id;
    this.logger.info(this, "Http delete to: " + url);
    if (this.testing) {
      return of(void 0);
    } else {
      return this.http.delete<void>(url);
    }
  }
}
