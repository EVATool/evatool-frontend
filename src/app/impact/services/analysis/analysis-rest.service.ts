import {LogService} from '../../../shared/services/log.service';
import {RestSettings} from '../../settings/RestSettings';
import {Observable} from 'rxjs';
import {AnalysisDto} from '../../dtos/AnalysisDto';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalysisRestService {

  constructor(
    private logger: LogService,
    private http: HttpClient) {
  }

  getAnalysisById(id: string): Observable<AnalysisDto> {
    this.logger.info(this, 'Get Analysis by Id');
    return this.http.get<AnalysisDto>(RestSettings.analysesUrl + "/" + id);
  }
}
