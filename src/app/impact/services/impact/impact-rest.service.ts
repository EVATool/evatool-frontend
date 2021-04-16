import {ImpactDto} from '../../dtos/ImpactDto';
import {RestSettings} from '../../settings/RestSettings';
import {LogService} from '../../../shared/services/log.service';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SampleDataService} from "../../spec/sample-data.service";
import {MockableService} from "../mockable.service";
import {RestService} from "../../../shared/services/rest.service";

@Injectable({
  providedIn: 'root'
})
export class ImpactRestService extends MockableService {

  constructor(
    private logger: LogService,
    private http: HttpClient,
    protected data: SampleDataService) {
    super();
  }

  onInit(): void {

  }

  getImpactsByAnalysisId(analysisId: string): Observable<ImpactDto[]> {
    this.logger.info(this, 'Get Impact by AnalysisId');
    if (this.useDummyData(this.data.offline)) {
      return of(this.data.dummyImpactDtos);
    } else {
      return this.http.get<ImpactDto[]>(RestService.getImpactsURL() + "?analysisId=" + analysisId);
    }
  }

  createImpact(impactDto: ImpactDto): Observable<any> {
    this.logger.info(this, 'Create Impact');
    if (this.useDummyData(this.data.offline)) {
      return of(impactDto);
    } else {
      return this.http.post(RestService.getImpactsURL(), impactDto, RestSettings.httpOptions);
    }
  }

  updateImpact(impactDto: ImpactDto): Observable<any> {
    this.logger.info(this, 'Update Impact');
    if (this.useDummyData(this.data.offline)) {
      return of(impactDto);
    } else {
      return this.http.put(RestService.getImpactsURL(), impactDto, RestSettings.httpOptions);
    }
  }

  deleteImpact(impactDto: ImpactDto): Observable<any> {
    this.logger.info(this, 'Delete Impact');
    if (this.useDummyData(this.data.offline)) {
      return of(impactDto);
    } else {
      return this.http.delete(RestService.getImpactsURL() + '/' + impactDto.id);
    }
  }
}
