import { DimensionMapperService } from './dimension-mapper.service';
import { LogService } from '../../../shared/services/log.service';
import { Dimension } from '../../models/Dimension';
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
    // Load dimensions.
    this.dimensionRestService.getDimensions().subscribe(dims => {
      dims.forEach(dim => {
        this.dimensions.push(this.dimensionMapperService.fromDto(dim));
      });
      this.logger.info(this, 'Dimensions loaded');
      this.loadedDimensions.emit(this.dimensions);
    });

    // Load dimension types.
    this.dimensionRestService.getDimensionTypes().subscribe(dimTypes => {
      this.dimensionTypes = dimTypes;
      this.logger.info(this, 'Dimension types loaded');
      this.loadedDimensionTypes.emit(this.dimensionTypes);
    });
  }

  getDefaultDimension(): Dimension {
    this.logger.debug(this, 'Get Default Dimension');
    return this.dimensions[0];
  }

  getDefaultDimensionType(): string {
    this.logger.debug(this, 'Get Default DimensionType');
    return this.dimensionTypes[0];
  }
}
