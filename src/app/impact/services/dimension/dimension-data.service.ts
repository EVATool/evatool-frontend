import { Dimension } from './../../models/Dimension';
import { DimensionRestService } from './dimension-rest.service';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DimensionDataService {
	@Output() dimensionsLoaded: EventEmitter<void> = new EventEmitter();
	@Output() dimensionTypesLoaded: EventEmitter<void> = new EventEmitter();

	public dimensionTypes: string[] = [];
	public dimensions: Dimension[] = [];

	constructor(private restService: DimensionRestService) {

	}

	onInit() {
		// Load dimensions.
		this.restService.getDimensions().subscribe(dims => {
			this.dimensions = dims;
			this.dimensionsLoaded.emit();
		});

		// Load dimension types.
		this.restService.getDimensionTypes().subscribe(dimTypes => {
			this.dimensionTypes = dimTypes;
			this.dimensionTypesLoaded.emit();
		});
	}

	getDimensions(): Dimension[] {
		return this.dimensions;
	}

	getDefaultDimensionType(): string {
		return this.dimensionTypes[0];
	}

	createDimension(dimension: Dimension): void {
		this.restService.createDimension(dimension).subscribe(dim => {
			this.dimensions.push(dim);
		});
	}

	updateDimension(dimension: Dimension): void {
		this.restService.updateDimension(dimension).subscribe(dim => {
			const index: number = this.dimensions.indexOf(dimension, 0);
			this.dimensions[index] = dim;
		});
	}

	deleteDimension(dimension: Dimension): void {
		this.restService.deleteDimension(dimension).subscribe(() => {
			const index: number = this.dimensions.indexOf(dimension, 0);
			this.dimensions.splice(index, 1);
		});
	}
}
