import { LogService } from '../../../shared/services/log.service';
import { DimensionDto } from '../../dtos/DimensionDto';
import { Dimension } from '../../models/Dimension';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DimensionMapperService {

  constructor(private logger: LogService) { }

  toDto(dimension: Dimension): DimensionDto {
    this.logger.info(this, 'Mapping Dimension to DimensionDto');
    const dimensionDto = new DimensionDto();

    dimensionDto.id = dimension.id;
    dimensionDto.name = dimension.name;
    dimensionDto.type = dimension.type;
    dimensionDto.description = dimension.description;

    return dimensionDto;
  }

  fromDto(dimensionDto: DimensionDto): Dimension {
    this.logger.info(this, 'Mapping DimensionDto to Dimension');
    const dimension = new Dimension();

    dimension.id = dimensionDto.id;
    dimension.name = dimensionDto.name;
    dimension.type = dimensionDto.type;
    dimension.description = dimensionDto.description;

    return dimension;
  }
}
