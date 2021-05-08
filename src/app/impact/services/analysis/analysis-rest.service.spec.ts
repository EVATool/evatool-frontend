import {SampleDataService} from '../../spec/sample-data.service';
import {RestSettings} from '../../settings/RestSettings';
import {HttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';

import {AnalysisRestService} from './analysis-rest.service';
import {LogService} from "../../../shared/services/log.service";
import {Injectable} from "@angular/core";
import {RestMock} from "../../spec/RestMock";
import {HttpTestingController} from "@angular/common/http/testing";

@Injectable({
  providedIn: 'root'
})
export class MockedAnalysisRestService extends AnalysisRestService {
  constructor(
    logger: LogService,
    http: HttpClient,
    data: SampleDataService) {
    super(logger, http, data);
    this.mocked = true;
  }
}

// describe('AnalysisRestService', () => {
//   let data: SampleDataService;
//   let httpMock: HttpTestingController;
//   let service: AnalysisRestService;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: RestMock.imports
//     });
//     data = TestBed.inject(SampleDataService);
//     httpMock = TestBed.inject(HttpTestingController);
//     service = TestBed.inject(AnalysisRestService);
//     service.testing = true;
//   });
//
//   afterEach(() => {
//     //httpMock.verify();
//   });
//
//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
//
//   it('should return an analysis by id', () => {
//     // Arrange
//     const dummyDto = data.dummyAnalysisDtos[0];
//
//     // Act
//     service.getAnalysisById(dummyDto.rootEntityID).subscribe(analysis => {
//       expect(analysis).toEqual(dummyDto);
//     });
//
//     // Assert
//     const req = httpMock.expectOne(RestSettings.analysesUrl + '/' + dummyDto.rootEntityID);
//     expect(req.request.method).toBe('GET');
//     req.flush(dummyDto);
//   });
// });
