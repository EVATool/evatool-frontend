import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {VariantDataService} from './variant-data.service';


describe('VariantDataService', () => {
  let service: VariantDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(VariantDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
