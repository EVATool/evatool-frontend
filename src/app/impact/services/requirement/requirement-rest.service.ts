import {Injectable} from '@angular/core';
import {MockableService} from "../mockable.service";
import {LogService} from "../../../shared/services/log.service";
import {HttpClient} from "@angular/common/http";
import {SampleDataService} from "../../spec/sample-data.service";
import {Observable, of} from "rxjs";
import {RestSettings} from "../../settings/RestSettings";

@Injectable({
  providedIn: 'root'
})
export class RequirementRestService extends MockableService {

  constructor(
    private logger: LogService,
    private http: HttpClient,
    protected data: SampleDataService) {
    super();
  }

  getRequirementsReferencedByImpactId(impactId: string): Observable<boolean> {
    this.logger.info(this, 'Get Requirement referenced by ImpactId');
    if (this.useDummyData(this.data.offline)) {
      return of(false);
    } else {
      return this.http.get<boolean>(RestSettings.impactReferencedUrl + "/" + impactId);
    }
  }

}
