import { SampleDataGenerator } from '../../spec/SampleDataGenerator';
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
    const dimension = SampleDataGenerator.getDummyDimension();

    // when
    const dimensionDto = service.toDto(dimension);

    // then
    expect(dimension.id === dimensionDto.id).toBeTruthy();
    expect(dimension.name === dimensionDto.name).toBeTruthy();
    expect(dimension.type === dimensionDto.type).toBeTruthy();
    expect(dimension.description === dimensionDto.description).toBeTruthy();
  });

  it('should convert from dto', () => {
    // given
    const dimensionDto = SampleDataGenerator.getDummyDimensionDto();

    // when
    const dimension = service.fromDto(dimensionDto);

    // then
    expect(dimension.id === dimensionDto.id).toBeTruthy();
    expect(dimension.name === dimensionDto.name).toBeTruthy();
    expect(dimension.type === dimensionDto.type).toBeTruthy();
    expect(dimension.description === dimensionDto.description).toBeTruthy();
  });
});
