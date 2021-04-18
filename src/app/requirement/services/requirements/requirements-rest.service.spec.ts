// import {HttpClientModule} from '@angular/common/http';
// import {TestBed} from '@angular/core/testing';
//
// import {RequirementsRestService} from './requirements-rest.service';
//
// describe('RequirementsRestService', () => {
//   let service: RequirementsRestService;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientModule]
//     });
//     service = TestBed.inject(RequirementsRestService);
//   });
//
//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

import {RequirementsRestService} from './requirements-rest.service';
import {Injectable} from '@angular/core';
import {LogService} from '../../../shared/services/log.service';
import {HttpClient} from '@angular/common/http';
import {SampleDataService} from '../spec/sample-data-service';
import {Observable, of} from 'rxjs';
import {Requirements} from '../../models/Requirements';

@Injectable({
  providedIn: 'root'
})

export class MockedRequirementsRestService extends RequirementsRestService {
  constructor(
    logger: LogService,
    http: HttpClient,
    private sampleData: SampleDataService) {
    super(http);
  }

  getRequirements(): Observable<any> {
    return of(this.sampleData.getDummyRequirements());
  }

  deleteRequirements(): Observable<any> {
    this.sampleData.delete();
    return super.deleteRequirements(this.sampleData.getDummyRequirement());
  }

  updateRequirements(requirement: Requirements): Observable<any> {
    this.sampleData.update();
    return of(this.sampleData.getDummyRequirements());
  }

  getRequirementsById(id: any): Observable<any> {
    return of(this.sampleData.getDummyRequirement());
  }

  createRequirements(requirement: Requirements): Observable<any> {
    return of(this.sampleData.getDummyRequirement());
  }
}
