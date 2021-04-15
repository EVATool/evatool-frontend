import {RestSettings} from '../../settings/RestSettings';
import {ValueDto} from '../../dtos/ValueDto';
import {LogService} from '../../../shared/services/log.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {SampleDataService} from "../../spec/sample-data.service";
import {MockableService} from "../mockable.service";

@Injectable({
  providedIn: 'root'
})
export class ValueRestService extends MockableService {

  constructor(
    private logger: LogService,
    private http: HttpClient,
    protected data: SampleDataService) {
    super();
  }

  onInit(): void {

  }

  getValues(): Observable<ValueDto[]> {
    this.logger.info(this, 'Get all Values');
    if (this.useDummyData(this.data.offline)) {
      return of(this.data.dummyValueDtos)
    } else {
      return this.http.get<ValueDto[]>(RestSettings.valuesUrl);
    }
  }

  getValuesByAnalysisId(analysisId: string): Observable<ValueDto[]> {
    this.logger.info(this, 'Get all Values');
    if (this.useDummyData(this.data.offline)) {
      return of(this.data.dummyValueDtos)
    } else {
      return this.http.get<ValueDto[]>(RestSettings.valuesUrl + "?analysisId=" + analysisId);
    }
  }

  createValue(valueDto: ValueDto): Observable<any> {
    this.logger.info(this, 'Create Value');
    if (this.useDummyData(this.data.offline)) {
      return of(valueDto);
    } else {
      return this.http.post(RestSettings.valuesUrl, valueDto, RestSettings.httpOptions);
    }
  }

  updateValue(valueDto: ValueDto): Observable<any> {
    this.logger.info(this, 'Update Value');
    if (this.useDummyData(this.data.offline)) {
      return of(valueDto);
    } else {
      return this.http.put(RestSettings.valuesUrl, valueDto, RestSettings.httpOptions);
    }
  }

  deleteValue(valueDto: ValueDto): Observable<any> {
    this.logger.info(this, 'Delete Value');
    if (this.useDummyData(this.data.offline)) {
      return of(valueDto);
    } else {
      return this.http.delete(RestSettings.valuesUrl + '/' + valueDto.id);
    }
  }

  getValueTypes(): Observable<string[]> {
    this.logger.info(this, 'Get all ValueTypes');
    if (this.useDummyData(this.data.offline)) {
      return of(this.data.dummyValueTypes)
    } else {
      return this.http.get<string[]>(RestSettings.valueTypesUrl);
    }
  }
}
