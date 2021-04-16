import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AnalysisRestService} from './analysis-rest.service';
import {Injectable} from '@angular/core';
import {LogService} from '../../../shared/services/log.service';
import {AnalysisSampleDataService} from '../spec/analysis-sample-data.service';
import {Observable, of} from 'rxjs';
import {AnalysisDTO} from '../../model/AnalysisDTO';
import {Analysis} from '../../model/Analysis';


@Injectable({
  providedIn: 'root'
})
export class MockedAnalysisRestService extends AnalysisRestService {

  constructor(
    logger: LogService,
    http: HttpClient,
    private sampleData: AnalysisSampleDataService) {
    super(http);
  }

  getAnalysis(): Observable<any> {
    return of(this.sampleData.getDummyAnalysesDTOs());
  }

  getAnalysisById(id: any): Observable<AnalysisDTO> {
    return of(this.sampleData.getDummyAnalysisDTO());
  }

  createAnalysis(analysisDTO: AnalysisDTO): Observable<any> {
    return of(this.sampleData.getDummyAnalysisDTO());
  }

  updateAnalysis(analysisDTO: AnalysisDTO): Observable<any> {
    return of(this.sampleData.getDummyAnalysis());
  }

  deleteAnalysis(analysis: Analysis): Observable<any> {
    this.sampleData.delete();
    return of(this.sampleData.getDummyAnalysis());
  }
}
