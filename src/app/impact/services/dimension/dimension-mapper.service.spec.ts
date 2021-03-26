import { SampleDataGenerator } from '../../spec/sample-data.service';
import { TestBed } from '@angular/core/testing';
import { DimensionMapperService } from './dimension-mapper.service';

describe('DimensionMapperService', () => {
  let service: DimensionMapperService;
  let data: SampleDataGenerator;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SampleDataGenerator]
    });
    service = TestBed.inject(DimensionMapperService);
    data = TestBed.inject(SampleDataGenerator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert to dto', () => {
    // given
    const dimension = data.getDummyDimension();

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
    const dimensionDto = data.getDummyDimensionDto();

    // when
    const dimension = service.fromDto(dimensionDto);

    // then
    expect(dimension.id === dimensionDto.id).toBeTruthy();
    expect(dimension.name === dimensionDto.name).toBeTruthy();
    expect(dimension.type === dimensionDto.type).toBeTruthy();
    expect(dimension.description === dimensionDto.description).toBeTruthy();
  });
});
