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
  @Output() insertedDimension: EventEmitter<Dimension> = new EventEmitter();
  @Output() updatedDimension: EventEmitter<Dimension> = new EventEmitter();
  @Output() deletedDimension: EventEmitter<Dimension> = new EventEmitter();

  dummyDimensionDtos: DimensionDto[] = [
    {
      id: '1', name: 'Feelings', description: 'Feelings of Patient', type: 'SOCIAL'
    },
    {
      id: '2', name: 'Control', description: 'Control of Doctor', type: 'SOCIAL'
    },
    {
      id: '3', name: 'Finances', description: 'Economics of Family', type: 'ECONOMIC'
    },
    {
      id: '4', name: 'Safety', description: 'Lorem Ipsum', type: 'SOCIAL'
    }
  ];
  dummyDimensionTypes: string[] = ['SOCIAL', 'ECONOMIC'];

  public dimensions: Dimension[] = [];
  public dimensionTypes: string[] = [];

  constructor(private dimensionRestService: DimensionRestService) {
    // Load dummy dimensions.
    this.dummyDimensionDtos.forEach(dim => {
      this.dimensions.push(DimensionMapperService.fromDto(dim));
    });
    console.log('Dimensions loaded.');
    this.loadedDimensions.emit(this.dimensions);

    // Load dummy dimension types.
    this.dummyDimensionTypes.forEach(dimType => {
      this.dimensionTypes.push(dimType);
    });
    this.loadedDimensionTypes.emit(this.dimensionTypes);
  }

  onInit(): void {
    // Load dimensions.
    this.dimensionRestService.getDimensions().subscribe(dims => {
      dims.forEach(dim => {
        this.dimensions.push(DimensionMapperService.fromDto(dim));
      });
      this.loadedDimensions.emit(this.dimensions);
    });

    // Load dimension types.
    this.dimensionRestService.getDimensionTypes().subscribe(dimTypes => {
      this.dimensionTypes = dimTypes;
    });
    this.loadedDimensionTypes.emit(this.dimensionTypes);
  }

  invalidate() {
    if (this.dimensions.length > 0) {
      this.loadedDimensions.emit(this.dimensions);
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
