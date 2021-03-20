import { ImpactDto } from '../../dtos/ImpactDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RestSettings } from '../../settings/RestSettings';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImpactRestService {

  constructor(private http: HttpClient) {

  }

  onInit(): void {

  }

  getImpacts(): Observable<ImpactDto[]> {
    return this.http.get<ImpactDto[]>(RestSettings.impactsUrl);
  }

  createImpact(impactDto: ImpactDto): Observable<any> {
    return this.http.post(RestSettings.impactsUrl, impactDto, RestSettings.httpOptions);
  }

  updateImpact(impactDto: ImpactDto): Observable<any> {
    return this.http.put(RestSettings.impactsUrl, impactDto, RestSettings.httpOptions);
  }

  deleteImpact(impactDto: ImpactDto): Observable<any> {
    return this.http.delete(RestSettings.impactsUrl + '/' + impactDto.id);
  }
}
