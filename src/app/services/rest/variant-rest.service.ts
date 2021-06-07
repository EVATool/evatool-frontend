import {Injectable} from '@angular/core';
import {LogService} from '../log.service';
import {HttpClient} from '@angular/common/http';
import {RestService} from '../rest.service';
import {Observable, of} from 'rxjs';
import {VariantDto} from '../../dto/VariantDto';
import {SampleDataService} from '../sample-data.service';

@Injectable({
  providedIn: 'root'
})
export class VariantRestService extends RestService {

  constructor(protected logger: LogService,
              protected http: HttpClient,
              protected sampleData: SampleDataService) {
    super(logger, http, sampleData);
  }

  getVariantsByAnalysisId(analysisId: string): Observable<VariantDto[]> {
    const url = this.variantsUrl + this.byAnalysisId + analysisId;
    this.logger.info(this, 'Http get to: ' + url);
    if (this.testing) {
      return of(this.sampleData.variantDtoList);
    } else {
      return this.http.get<VariantDto[]>(url);
    }
  }

  createVariant(variantDto: VariantDto): Observable<VariantDto> {
    const url = this.variantsUrl;
    this.logger.info(this, 'Http post to: ' + url);
    if (this.testing) {
      return of(variantDto);
    } else {
      return this.http.post<VariantDto>(url, variantDto, this.httpOptions);
    }
  }

  updateVariant(variantDto: VariantDto): Observable<VariantDto> {
    const url = this.variantsUrl;
    this.logger.info(this, 'Http put to: ' + url);
    if (this.testing) {
      return of(variantDto);
    } else {
      return this.http.put<VariantDto>(url, variantDto, this.httpOptions);
    }
  }

  deleteVariant(id: string): Observable<void> {
    const url = this.variantsUrl + '/' + id;
    this.logger.info(this, 'Http delete to: ' + url);
    if (this.testing) {
      return of(void 0);
    } else {
      return this.http.delete<void>(url);
    }
  }
}
