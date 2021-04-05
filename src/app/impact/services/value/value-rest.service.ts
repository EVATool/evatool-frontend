import {RestSettings} from '../../settings/RestSettings';
import {ValueDto} from '../../dtos/ValueDto';
import {LogService} from '../../../shared/services/log.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ImpactDto} from "../../dtos/ImpactDto";

@Injectable({
  providedIn: 'root'
})
export class ValueRestService {

  constructor(
    private logger: LogService,
    private http: HttpClient) {

  }

  onInit(): void {

  }

  getValues(): Observable<ValueDto[]> {
    this.logger.info(this, 'Get all Values');
    return this.http.get<ValueDto[]>(RestSettings.valuesUrl);
  }

  getValuesByAnalysisId(analysisId: string): Observable<ValueDto[]> {
    this.logger.info(this, 'Get all Values');
    return this.http.get<ValueDto[]>(RestSettings.valuesUrl + "?analysisId=" + analysisId);
  }

  createValue(valueDto: ValueDto): Observable<any> {
    this.logger.info(this, 'Create Value');
    return this.http.post(RestSettings.valuesUrl, valueDto, RestSettings.httpOptions);
  }

  updateValue(valueDto: ValueDto): Observable<any> {
    this.logger.info(this, 'Update Value');
    return this.http.put(RestSettings.valuesUrl, valueDto, RestSettings.httpOptions);
  }

  deleteValue(valueDto: ValueDto): Observable<any> {
    this.logger.info(this, 'Delete Value');
    return this.http.delete(RestSettings.valuesUrl + '/' + valueDto.id);
  }

  getValueTypes(): Observable<string[]> {
    this.logger.info(this, 'Get all ValueTypes');
    return this.http.get<string[]>(RestSettings.valueTypesUrl);
  }
}
