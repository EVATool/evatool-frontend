import {Injectable} from '@angular/core';
import {LogService} from "../log.service";
import {HttpClient} from "@angular/common/http";
import {RestService} from "../rest.service";
import {Observable, of} from "rxjs";
import {RequirementDto} from "../../dto/RequirementDto";
import {SampleDataService} from "../sample-data.service";

@Injectable({
  providedIn: 'root'
})
export class RequirementRestService extends RestService {

  constructor(protected logger: LogService,
              protected http: HttpClient,
              protected sampleData: SampleDataService) {
    super(logger, http, sampleData);
  }

  getRequirementsByAnalysisId(analysisId: string): Observable<RequirementDto[]> {
    const url = this.requirementsUrl + this.byAnalysisId + analysisId;
    this.logger.info(this, "Http get to: " + url);
    if (this.testing) {
      return of(this.sampleData.requirementDtoList);
    } else {
      return this.http.get<RequirementDto[]>(url);
    }
  }

  createRequirement(requirementDto: RequirementDto): Observable<RequirementDto> {
    const url = this.requirementsUrl;
    this.logger.info(this, "Http post to: " + url);
    if (this.testing) {
      return of(requirementDto);
    } else {
      return this.http.post<RequirementDto>(url, requirementDto, this.httpOptions);
    }
  }

  updateRequirement(requirementDto: RequirementDto): Observable<RequirementDto> {
    const url = this.requirementsUrl;
    this.logger.info(this, "Http put to: " + url);
    if (this.testing) {
      return of(requirementDto);
    } else {
      return this.http.put<RequirementDto>(url, requirementDto, this.httpOptions);
    }
  }

  deleteRequirement(id: string): Observable<void> {
    const url = this.requirementsUrl + '/' + id;
    this.logger.info(this, "Http delete to: " + url);
    if (this.testing) {
      return of(void 0);
    } else {
      return this.http.delete<void>(url);
    }
  }
}
