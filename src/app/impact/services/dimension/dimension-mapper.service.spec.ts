import { SampleDataService } from '../../spec/sample-data.service';
import { TestBed } from '@angular/core/testing';
import { DimensionMapperService } from './dimension-mapper.service';

describe('DimensionMapperService', () => {
  let service: DimensionMapperService;
  let data: SampleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SampleDataService]
    });
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
    expect(dimension.id === dimensionDto.id).toBeTruthy();
    expect(dimension.name === dimensionDto.name).toBeTruthy();
    expect(dimension.type === dimensionDto.type).toBeTruthy();
    expect(dimension.description === dimensionDto.description).toBeTruthy();
  });

  it('should convert from dto', () => {
    // Arrange
    const dimensionDto = data.getDummyDimensionDto();

    // Act
    const dimension = service.fromDto(dimensionDto);

    // Assert
    expect(dimension.id === dimensionDto.id).toBeTruthy();
    expect(dimension.name === dimensionDto.name).toBeTruthy();
    expect(dimension.type === dimensionDto.type).toBeTruthy();
    expect(dimension.description === dimensionDto.description).toBeTruthy();
  });
});
