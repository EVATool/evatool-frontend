import { LogService } from '../../settings/log.service';
import { DataLoader } from '../../settings/DataLoader';
import { DimensionDto } from './../../dtos/DimensionDto';
import { DimensionMapperService } from './dimension-mapper.service';
import { Dimension } from './../../models/Dimension';
import { DimensionRestService } from './dimension-rest.service';
import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DimensionDataService {
  @Output() loadedDimensions: EventEmitter<Dimension[]> = new EventEmitter();
  @Output() loadedDimensionTypes: EventEmitter<string[]> = new EventEmitter();
  @Output() addedDimension: EventEmitter<Dimension> = new EventEmitter();
  @Output() changedDimension: EventEmitter<Dimension> = new EventEmitter();
  @Output() removedDimension: EventEmitter<Dimension> = new EventEmitter();

  public dimensions: Dimension[] = [];
  public dimensionTypes: string[] = [];

  constructor(
    private logger: LogService,
    private dimensionMapperService: DimensionMapperService,
    private dimensionRestService: DimensionRestService) {
  }

  onInit(): void {
    if (DataLoader.useDummyData) {
      // Load dummy dimensions.
      DataLoader.dummyDimensionDtos.forEach(dim => {
        this.dimensions.push(this.dimensionMapperService.fromDto(dim));
      });
      this.logger.info('Dimensions loaded.');
      this.loadedDimensions.emit(this.dimensions);

      // Load dummy dimension types.
      DataLoader.dummyDimensionTypes.forEach(dimType => {
        this.dimensionTypes.push(dimType);
      });
      this.logger.info('Dimension types loaded.');
      this.loadedDimensionTypes.emit(this.dimensionTypes);
    } else {
      // Load dimensions.
      this.dimensionRestService.getDimensions().subscribe(dims => {
        dims.forEach(dim => {
          this.dimensions.push(this.dimensionMapperService.fromDto(dim));
        });
        this.logger.info('Dimensions loaded.');
        this.logger.info(this.dimensions);
        this.loadedDimensions.emit(this.dimensions);
      });

      // Load dimension types.
      this.dimensionRestService.getDimensionTypes().subscribe(dimTypes => {
        this.dimensionTypes = dimTypes;
        this.logger.info('Dimension types loaded.');
        this.logger.info(this.dimensionTypes);
      });
      this.loadedDimensionTypes.emit(this.dimensionTypes);
    }
  }

  getDefaultDimension(): Dimension {
    return this.dimensions[0];
  }

  getDefaultDimensionType(): string {
    return this.dimensionTypes[0];
  }

  createDimension(dimension: Dimension): void {
    this.dimensionRestService.createDimension(dimension).subscribe(dim => {
      this.dimensions.push(dim);
    });
  }

  updateDimension(dimension: Dimension): void {
    this.dimensionRestService.updateDimension(dimension).subscribe(dim => {
      const index: number = this.dimensions.indexOf(dimension, 0);
      this.dimensions[index] = dim;
    });
  }

  deleteDimension(dimension: Dimension): void {
    this.dimensionRestService.deleteDimension(dimension).subscribe(() => {
      const index: number = this.dimensions.indexOf(dimension, 0);
      this.dimensions.splice(index, 1);
    });
  }
}
