import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Requirements} from '../../models/Requirements';
import {Impact} from "../../models/Impact";
import {Variants} from "../../models/Variants";
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

  requirmentUrl = 'http://79.171.179.211:443/requirements'; // Outsource!
  // requirmentUrl = 'http://localhost:8080/requirements'; // Outsource!
  impactsUrl = 'http://79.171.179.211:443/impacts'; // Outsource!
  // impactsUrl = 'http://localhost:8080/requirements/impacts'; // Outsource!
  variantsUrl = 'http://79.171.179.211:443/variants'; // Outsource!

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
  getVariants(): Observable<Variants> {
    return this.http.get<any>(RestService.getVariantsURL());
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
