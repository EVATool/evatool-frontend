// import {TestBed} from '@angular/core/testing';
//
// import {VariantsRestService} from './variants-rest.service';
//
// describe('VariantsRestService', () => {
//   let service: VariantsRestService;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(VariantsRestService);
//   });
//
//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

import {Injectable} from '@angular/core';
import {VariantsRestService} from './variants-rest.service';
import {LogService} from '../../../shared/services/log.service';
import {HttpClient} from '@angular/common/http';
import {SampleDataService} from '../spec/sample-data-service';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MockedVariantsRestService extends VariantsRestService{

  constructor(
    logger: LogService,
    http: HttpClient,
    private sampleData: SampleDataService) {
    super(http);
  }

  getVariants(): Observable<any> {
    return of(this.sampleData.getDummyVariantDTOs());
  }

  getVariantsById(id: any): Observable<any> {
    return of(this.sampleData.getDummyVariantDTO());
  }

}
