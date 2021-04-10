import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AnalysisDTO} from "../../model/AnalysisDTO";
import {Analysis} from "../../model/Analysis";

const httpOptions = { // Outsource!
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AnalysisRestService {

  analysisUrl = 'http://79.171.179.211:443/analysis';

  constructor(private http: HttpClient) {

  }

  getAnalysis(): Observable<AnalysisDTO> {
    return this.http.get<AnalysisDTO>(this.analysisUrl);
  }

  deepCopy(analysisId: string, analysisDto: AnalysisDTO): Observable<AnalysisDTO> {
    return this.http.post<AnalysisDTO>("/analysis/deep-copy/" + analysisId, analysisDto, httpOptions);
  }

  getAnalysisById(id: any): Observable<AnalysisDTO> {
    return this.http.get<any>(this.analysisUrl + '/' + id);
  }

  createAnalysis(analysisDTO: AnalysisDTO): Observable<any> {
    return this.http.post(this.analysisUrl, analysisDTO, httpOptions);
  }

  updateAnalysis(analysisDTO: AnalysisDTO): Observable<any> {
    return this.http.put(this.analysisUrl, analysisDTO, httpOptions);
  }

  deleteAnalysis(analysis: Analysis): Observable<any> {
    return this.http.delete(this.analysisUrl + '/' + analysis.id);
  }
}
