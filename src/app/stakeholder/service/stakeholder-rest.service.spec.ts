import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {StakeholderRestService} from './stakeholder-rest.service';


describe('StakeholderRestService', () => {
  let service: StakeholderRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(StakeholderRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});