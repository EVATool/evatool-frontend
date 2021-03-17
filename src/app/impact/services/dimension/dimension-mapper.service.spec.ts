import { SampleDataGenerator } from './../../spec/SampleDataGenerator';
import { TestBed } from '@angular/core/testing';
import { DimensionMapperService } from './dimension-mapper.service';

describe('DimensionMapperService', () => {
  let service: DimensionMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DimensionMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert to dto', () => {
    // given
    let dimension = SampleDataGenerator.getDummyDimension();

    // when
    let dimensionDto = DimensionMapperService.toDto(dimension);

    // then
    expect(dimension.id === dimensionDto.id).toBeTruthy();
    expect(dimension.name === dimensionDto.name).toBeTruthy();
    expect(dimension.type === dimensionDto.type).toBeTruthy();
    expect(dimension.description === dimensionDto.description).toBeTruthy();
  });

  it('should convert from dto', () => {
    // given
    let dimensionDto =SampleDataGenerator.getDummyDimensionDto();

    // when
    let dimension = DimensionMapperService.fromDto(dimensionDto);

    // then
    expect(dimension.id === dimensionDto.id).toBeTruthy();
    expect(dimension.name === dimensionDto.name).toBeTruthy();
    expect(dimension.type === dimensionDto.type).toBeTruthy();
    expect(dimension.description === dimensionDto.description).toBeTruthy();
  });
});
