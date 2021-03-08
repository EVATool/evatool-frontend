import { Dimension } from './../../models/Dimension';
import { DimensionRestService } from './dimension-rest.service';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DimensionDataService {

	public dimensionTypes: string[] = [];

	constructor(private restService: DimensionRestService) {

	}

	onInit() {

	}

	getDimensions() {

	}

	private initDimensionTypes() {

	}

	getDefaultDimensionType() {
		return this.dimensionTypes[0];
	}

	createDimension() {

	}

	updateDimension() {

	}

	deleteDimension() {

	}
}
