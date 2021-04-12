import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AnalysisDTO} from "../../model/AnalysisDTO";
import {Analysis} from "../../model/Analysis";
import {RestService} from '../../../shared/services/rest.service';

const httpOptions = { // Outsource!
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AnalysisRestService {

  constructor(private http: HttpClient) {

  }

  getAnalysis(): Observable<AnalysisDTO> {
    return this.http.get<AnalysisDTO>(RestService.getAnalysisURL());
  }

  deepCopy(analysisId: string, analysisDto: AnalysisDTO): Observable<AnalysisDTO> {
    console.log(analysisId);
    console.log(analysisDto);
    return this.http.post<AnalysisDTO>(RestService.getAnalysisURL() + '/deep-copy/' + analysisId, analysisDto, httpOptions);
  }

  getAnalysisById(id: any): Observable<AnalysisDTO> {
    return this.http.get<any>(RestService.getAnalysisURL() + '/' + id);
  }

  createAnalysis(analysisDTO: AnalysisDTO): Observable<any> {
    return this.http.post(RestService.getAnalysisURL(), analysisDTO, httpOptions);
  }

  updateAnalysis(analysisDTO: AnalysisDTO): Observable<any> {
    return this.http.put(RestService.getAnalysisURL(), analysisDTO, httpOptions);
  }

  deleteAnalysis(analysis: Analysis): Observable<any> {
    return this.http.delete(RestService.getAnalysisURL() + '/' + analysis.rootEntityID);
  }
}
