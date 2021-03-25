import { RestSettings } from './../../settings/RestSettings';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ImpactRestService } from './impact-rest.service';

describe('ImpactRestService', () => {
  let httpMock: HttpTestingController;
  let service: ImpactRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ImpactRestService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getImpacts', () => {
    it('should return an Observable<ImpactDto[]>', () => {
      // Arrage
      const dummyDtos = DataLoader.dummyImpactDtos;

      // Act
      service.getImpacts().subscribe(impacts => {
        expect(impacts.length).toBe(dummyDtos.length);
        expect(impacts).toEqual(dummyDtos);
      });

      // Assert
      const req = httpMock.expectOne(RestSettings.impactsUrl);
      expect(req.request.method).toBe('GET');
      req.flush(dummyDtos);
    });
  });

  describe('#getImpactsByAnalysisId', () => {
    it('should return an Observable<ImpactDto[]>', () => {
      // Arrage
      const analysisId = DataLoader.dummyImpactDtos[0].analysis.id
      const dummyDtos = DataLoader.dummyImpactDtos.filter(impact => impact.analysis.id == analysisId);

      // Act
      service.getImpactsByAnalysisId(analysisId).subscribe(impacts => {
        expect(impacts.length).toBe(dummyDtos.length);
        expect(impacts).toEqual(dummyDtos);
      });

      // Assert
      const req = httpMock.expectOne(RestSettings.impactsUrl + '?analysisId=' + analysisId);
      expect(req.request.method).toBe('GET');
      req.flush(dummyDtos);
    });
  });

  describe('#createImpact', () => {
    it('should return an Observable<any>', () => {
      // Arrage
      const dummyDto = DataLoader.dummyImpactDtos[0];

      // Act
      service.createImpact(dummyDto).subscribe(impact => {
        expect(impact).toEqual(dummyDto);
      });

      // Assert
      const req = httpMock.expectOne(RestSettings.impactsUrl);
      expect(req.request.method).toBe('POST');
      req.flush(dummyDto);
    });
  });

  describe('#updateImpact', () => {
    it('should return an Observable<any>', () => {
      // Arrage
      const dummyDto = DataLoader.dummyImpactDtos[0];

      // Act
      service.updateImpact(dummyDto).subscribe(impact => {
        expect(impact).toEqual(dummyDto);
      });

      // Assert
      const req = httpMock.expectOne(RestSettings.impactsUrl);
      expect(req.request.method).toBe('PUT');
      req.flush(dummyDto);
    });
  });

  describe('#deleteImpact', () => {
    it('should return an Observable<any>', () => {
      // Arrage
      const dummyDto = DataLoader.dummyImpactDtos[0];

      // Act
      service.deleteImpact(dummyDto).subscribe(impact => {
        expect(impact).toEqual(dummyDto);
      });

      // Assert
      const req = httpMock.expectOne(RestSettings.impactsUrl + '/' + dummyDto.id);
      expect(req.request.method).toBe('DELETE');
      req.flush(dummyDto);
    });
  });
});
