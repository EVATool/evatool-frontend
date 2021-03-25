import { ImpactDto } from './../../dtos/ImpactDto';
import { RestSettings } from './../../settings/RestSettings';
import { LogService } from './../../settings/log.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImpactRestService {

  constructor(
    private logger: LogService,
    private http: HttpClient) {

  }

  onInit(): void {

  }

  getImpacts(): Observable<ImpactDto[]> {
    this.logger.info(this, 'Get all Impacts');
    return this.http.get<ImpactDto[]>(RestSettings.impactsUrl);
  }

  getImpactsByAnalysisId(analysisId: string): Observable<ImpactDto[]> {
    this.logger.info(this, 'Get Impact by AnalysisId');
    return this.http.get<ImpactDto[]>(RestSettings.impactsUrl + "?analysisId=" + analysisId);
  }

  createImpact(impactDto: ImpactDto): Observable<any> {
    this.logger.info(this, 'Create Impact');
    return this.http.post(RestSettings.impactsUrl, impactDto, RestSettings.httpOptions);
  }

  updateImpact(impactDto: ImpactDto): Observable<any> {
    this.logger.info(this, 'Update Impact');
    return this.http.put(RestSettings.impactsUrl, impactDto, RestSettings.httpOptions);
  }

  deleteImpact(impactDto: ImpactDto): Observable<any> {
    this.logger.info(this, 'Delete Impact');
    return this.http.delete(RestSettings.impactsUrl + '/' + impactDto.id);
  }
}
