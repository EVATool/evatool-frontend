import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ImpactDataService } from './impact-data.service';

describe('ImpactDataService', () => {
  let service: ImpactDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ImpactDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate decimal places required', () => {
    const numbers = [1, 9, 10, 99, 100, 999, 1000, 9999];
    const decimalPlaces = [1, 1, 2, 2, 3, 3, 4, 4];

    numbers.forEach((number, index) => {
      const decimals = service.calculateDecimalPlaces(number);
      expect(decimals).toEqual(decimalPlaces[index]);
    });
  })
});
