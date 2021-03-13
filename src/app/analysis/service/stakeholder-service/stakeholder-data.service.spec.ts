import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {StakeholderDataService} from './stakeholder-data.service';


describe('StakeholderDataService', () => {
  let service: StakeholderDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(StakeholderDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
