import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Requirements} from '../../models/Requirements';
import {Impact} from '../../models/Impact';
import {Variants} from '../../models/Variants';
import {RestService} from '../../../shared/services/rest.service';

const httpOptions = { // Outsource!
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RequirementsRestService {
  constructor(private http: HttpClient) {

  }

  getRequirements(id: string): Observable<Requirements[]> {
    return this.http.get<Requirements[]>(RestService.getRequirementesURL() + '?analysisId=' + id);
  }
  getImpacts(id: string): Observable<Impact> {
    return this.http.get<any>(RestService.getImpactsURL() + '?analysisId=' + id);
  }
  getImpactsAll(): Observable<Impact> {
    return this.http.get<any>(RestService.getImpactsURL());
  }
  getVariants(id: string): Observable<Variants> {
    return this.http.get<any>(RestService.getVariantsURL() + '?analysisId=' + id);
  }
  createRequirements(requirement: Requirements): Observable<any> {
    return this.http.post(RestService.getRequirementesURL(), requirement, httpOptions);
  }
  updateRequirements(requirement: Requirements): Observable<any> {
    return this.http.put(RestService.getRequirementesURL(), requirement, httpOptions);
  }

  deleteRequirements(requirements: Requirements): Observable<any> {
    return this.http.delete(RestService.getRequirementesURL() + '/' + requirements.rootEntityId);
  }
}
