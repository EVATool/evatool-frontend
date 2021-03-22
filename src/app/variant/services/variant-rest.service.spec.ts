import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {VariantRestService} from './variant-rest.service';


describe('VariantRestService', () => {
  let service: VariantRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(VariantRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
