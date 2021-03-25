import { RestSettings } from './../../settings/RestSettings';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StakeholderRestService } from './stakeholder-rest.service';

describe('StakeholderRestService', () => {
  let httpMock: HttpTestingController;
  let service: StakeholderRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(StakeholderRestService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getStakeholders', () => {
    it('should return an Observable<StakeholderDto[]>', () => {
      // Arrage
      const dummyDtos = DataLoader.dummyStakeholderDtos;

      // Act
      service.getStakeholders().subscribe(stakeholders => {
        expect(stakeholders.length).toBe(dummyDtos.length);
        expect(stakeholders).toEqual(dummyDtos);
      });

      // Assert
      const req = httpMock.expectOne(RestSettings.stakeholdersUrl);
      expect(req.request.method).toBe('GET');
      req.flush(dummyDtos);
    });
  });
});
