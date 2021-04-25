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
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})

export class MockedRequirementsRestService extends RequirementsRestService {
  constructor(
    logger: LogService,
    http: HttpClient,
    private data: SampleDataService) {
    super(http);
  }
}

describe('RequirementRestService', () => {

  let data: SampleDataService;
  let httpMock: HttpTestingController;
  let service: RequirementsRestService;

  beforeEach( () => {
    TestBed.configureTestingModule( {
      imports: [HttpClientTestingModule]
    });
    data = TestBed.inject(SampleDataService);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(RequirementsRestService);
  });
});
