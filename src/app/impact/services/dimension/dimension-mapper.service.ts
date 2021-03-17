import { DimensionDto } from './../../dtos/DimensionDto';
import { Dimension } from './../../models/Dimension';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DimensionMapperService {

  constructor() { }

  static toDto(dimension: Dimension): DimensionDto {
    let dimensionDto = new DimensionDto();

    dimensionDto.id = dimension.id;
    dimensionDto.name = dimension.name;
    dimensionDto.type = dimension.type;
    dimensionDto.description = dimension.description;

    return dimensionDto;
  }

  static fromDto(dimensionDto: DimensionDto): Dimension {
    let dimension = new Dimension();

    dimension.id = dimensionDto.id;
    dimension.name = dimensionDto.name;
    dimension.type = dimensionDto.type;
    dimension.description = dimensionDto.description;

    return dimension;
  }
}
