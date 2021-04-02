import {SampleDataService} from '../../spec/sample-data.service';
import {TestBed} from '@angular/core/testing';
import {DimensionMapperService} from './dimension-mapper.service';

describe('DimensionMapperService', () => {
  let service: DimensionMapperService;
  let data: SampleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DimensionMapperService);
    data = TestBed.inject(SampleDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert to dto', () => {
    // Arrange
    const dimension = data.getDummyDimension();

    // Act
    const dimensionDto = service.toDto(dimension);

    // Assert
    expect(dimension.equalsDto(dimensionDto)).toBeTruthy();
  });

  it('should convert from dto', () => {
    // Arrange
    const dimensionDto = data.getDummyDimensionDto();

    // Act
    const dimension = service.fromDto(dimensionDto);

    // Assert
    expect(dimension.equalsDto(dimensionDto)).toBeTruthy();
  });
});
