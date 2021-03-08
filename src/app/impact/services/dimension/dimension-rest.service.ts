import { Dimension } from './../../models/Dimension';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = { // Outsource!
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
}

@Injectable({
	providedIn: 'root'
})
export class DimensionRestService {

	dimensionsUrl: string = '/api/dimensions'; // Outsource!

	constructor(private http: HttpClient) {

	}

	onInit() {

	}

	getDimensions() {
		return this.http.get<Dimension[]>(this.dimensionsUrl);
	}

	getDimensionTypes() {
		return this.http.get<string[]>(this.dimensionsUrl + "/types");
	}

	createDimension(dimension: Dimension) {
		return this.http.post(this.dimensionsUrl, dimension, httpOptions);
	}

	updateDimension(dimension: Dimension) {
		return this.http.put(this.dimensionsUrl, dimension, httpOptions);
	}

	deleteDimension(dimension: Dimension) {
		return this.http.delete(this.dimensionsUrl + "/" + dimension.id);
	}
}
