import {LogService} from '../../../shared/services/log.service';
import {Observable, of} from 'rxjs';
import {AnalysisDto} from '../../dtos/AnalysisDto';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SampleDataService} from "../../spec/sample-data.service";
import {MockableService} from "../mockable.service";
import {RestService} from "../../../shared/services/rest.service";

@Injectable({
  providedIn: 'root'
})
export class AnalysisRestService extends MockableService {

  constructor(
    private logger: LogService,
    private http: HttpClient,
    protected data: SampleDataService) {
    super();
  }

  getAnalysisById(id: string): Observable<AnalysisDto> {
    this.logger.info(this, 'Get Analysis by Id');
    if (this.useDummyData(this.data.offline)) {
      return of(this.data.dummyAnalysisDtos[0]);
    } else {
      return this.http.get<AnalysisDto>(RestService.getAnalysisURL() + "/" + id);
    }
  }
}
