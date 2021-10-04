import {Injectable} from '@angular/core';
import {RestService} from './rest.service';
import {LogService} from '../log.service';
import {HttpClient} from '@angular/common/http';
import {SampleDataService} from '../sample-data.service';
import {Observable, of} from 'rxjs';
import {VariantTypeDto} from '../../dto/VariantTypeDto';

@Injectable({
  providedIn: 'root'
})
export class VariantTypeRestService extends RestService {

  constructor(protected logger: LogService,
              protected http: HttpClient,
              protected sampleData: SampleDataService) {
    super(logger, http, sampleData);
  }

  getVariantTypesByAnalysisId(analysisId: string): Observable<VariantTypeDto[]> {
    const url = this.variantTypesUrl + this.byAnalysisId + analysisId;
    this.logger.debug(this, 'Http get to: ' + url);
    if (this.testing) {
      return of(this.sampleData.variantTypeDtoList);
    } else {
      return this.http.get<VariantTypeDto[]>(url);
    }
  }

  createVariantType(variantTypeDto: VariantTypeDto): Observable<VariantTypeDto> {
    const url = this.variantTypesUrl;
    this.logger.debug(this, 'Http post to: ' + url);
    if (this.testing) {
      return of(variantTypeDto);
    } else {
      return this.http.post<VariantTypeDto>(url, variantTypeDto, this.httpOptions);
    }
  }

  updateVariantType(variantTypeDto: VariantTypeDto): Observable<VariantTypeDto> {
    const url = this.variantTypesUrl;
    this.logger.debug(this, 'Http put to: ' + url);
    if (this.testing) {
      return of(variantTypeDto);
    } else {
      return this.http.put<VariantTypeDto>(url, variantTypeDto, this.httpOptions);
    }
  }

  deleteVariantType(id: string): Observable<void> {
    const url = this.variantTypesUrl + '/' + id;
    this.logger.debug(this, 'Http delete to: ' + url);
    if (this.testing) {
      return of(void 0);
    } else {
      return this.http.delete<void>(url);
    }
  }
}
