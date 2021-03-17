import { DimensionDto } from './../../dtos/DimensionDto';
import { Dimension } from './../../models/Dimension';
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
    let dimension = new Dimension();
    dimension.id = 'id';
    dimension.name = 'name';
    dimension.type = 'type';
    dimension.description = 'description';

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
    let dimensionDto = new DimensionDto();
    dimensionDto.id = 'id';
    dimensionDto.name = 'name';
    dimensionDto.type = 'type';
    dimensionDto.description = 'description';

    // when
    let dimension = DimensionMapperService.fromDto(dimensionDto);

    // then
    expect(dimension.id === dimensionDto.id).toBeTruthy();
    expect(dimension.name === dimensionDto.name).toBeTruthy();
    expect(dimension.type === dimensionDto.type).toBeTruthy();
    expect(dimension.description === dimensionDto.description).toBeTruthy();
  });
});
