import { ImpactDto } from './../../dtos/ImpactDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RestSettings } from './../../settings/RestSettings';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImpactRestService {

  constructor(private http: HttpClient) {

  }

  getImpacts(): Observable<ImpactDto[]> {
    return this.http.get<ImpactDto[]>(RestSettings.impactsUrl);
  }
}
