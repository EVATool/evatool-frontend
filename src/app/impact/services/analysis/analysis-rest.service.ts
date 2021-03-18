import { RestSettings } from './../../settings/RestSettings';
import { Observable } from 'rxjs';
import { AnalysisDto } from './../../dtos/AnalysisDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalysisRestService {

  constructor(private http: HttpClient) {

  }

  onInit() {

  }

  getAnalyses(): Observable<AnalysisDto[]> {
    return this.http.get<AnalysisDto[]>(RestSettings.analysesUrl);
  }
}
