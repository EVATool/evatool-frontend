import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {VariantDataService} from './variant-data.service';
import {RouterTestingModule} from '@angular/router/testing';


describe('VariantDataService', () => {
  let service: VariantDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
      RouterTestingModule]
    });
    service = TestBed.inject(VariantDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
