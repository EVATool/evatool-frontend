import { DimensionMapperService } from './dimension-mapper.service';
import { Dimension } from './../../models/Dimension';
import { DimensionRestService } from './dimension-rest.service';
import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DimensionDataService {
  @Output() dimensionsLoaded: EventEmitter<Dimension[]> = new EventEmitter();
  @Output() dimensionTypesLoaded: EventEmitter<string[]> = new EventEmitter();
  @Output() dimensionInserted: EventEmitter<Dimension> = new EventEmitter();
  @Output() dimensionUpdated: EventEmitter<Dimension> = new EventEmitter();
  @Output() dimensionDeleted: EventEmitter<Dimension> = new EventEmitter();

  dummyDimensionDtos: Dimension[] = [
    {
      id: '21', name: 'Feelings', description: 'Feelings of Patient', type: 'SOCIAL'
    },
    {
      id: '22', name: 'Control', description: 'Control of Doctor', type: 'SOCIAL'
    },
    {
      id: '23', name: 'Finances', description: 'Economics of Family', type: 'ECONOMIC'
    },
    {
      id: '24', name: 'Safety', description: 'Lorem Ipsum', type: 'SOCIAL'
    }
  ];
  dummyDimensionTypes: string[] = ['SOCIAL', 'ECONOMIC'];

  public dimensions: Dimension[] = [];
  public dimensionTypes: string[] = [];

  constructor(private dimensionRestService: DimensionRestService) {
    // Load dummy dimensions.
    this.dummyDimensionDtos.forEach(dim => {
      this.dimensions.push(DimensionMapperService.toDto(dim));
    });
    this.dimensionsLoaded.emit(this.dimensions);

    // Load dummy dimension types.
    this.dummyDimensionTypes.forEach(dimType => {
      this.dimensionTypes.push(dimType);
    });
    this.dimensionTypesLoaded.emit(this.dimensionTypes);
  }

  onInit(): void {
    // Load dimensions.
    this.dimensionRestService.getDimensions().subscribe(dims => {
      dims.forEach(dim => {
        this.dimensions.push(DimensionMapperService.toDto(dim));
      });
      this.dimensionsLoaded.emit(this.dimensions);
    });

    // Load dimension types.
    this.dimensionRestService.getDimensionTypes().subscribe(dimTypes => {
      this.dimensionTypes = dimTypes;
    });
    this.dimensionTypesLoaded.emit(this.dimensionTypes);
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
