import { DataLoader } from './../../settings/DataLoader';
import { DimensionMapperService } from './dimension-mapper.service';
import { LogService } from './../../settings/log.service';
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

  public useDummyData: boolean;

  constructor(
    private logger: LogService,
    private dimensionMapperService: DimensionMapperService,
    private dimensionRestService: DimensionRestService) {
    this.useDummyData = DataLoader.useDummyData;
  }

  onInit(): void {
    if (this.useDummyData) {
      // Load dummy dimensions.
      DataLoader.dummyDimensionDtos.forEach(dim => {
        this.dimensions.push(this.dimensionMapperService.fromDto(dim));
      });
      this.logger.info(this, 'Dimensions loaded');
      this.loadedDimensions.emit(this.dimensions);

      // Load dummy dimension types.
      DataLoader.dummyDimensionTypes.forEach(dimType => {
        this.dimensionTypes.push(dimType);
      });
      this.logger.info(this, 'Dimension types loaded');
      this.loadedDimensionTypes.emit(this.dimensionTypes);
    } else {
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
