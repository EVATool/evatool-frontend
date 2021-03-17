import { DimensionDto } from './../../dtos/DimensionDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = { // Outsource!
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DimensionRestService {

  dimensionsUrl = '/api/dimensions'; // Outsource!

  constructor(private http: HttpClient) {

  }

  onInit(): void {

  }

  getDimensions(): Observable<DimensionDto[]> {
    return this.http.get<DimensionDto[]>(this.dimensionsUrl);
  }

  getDimensionTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.dimensionsUrl + '/types');
  }

  createDimension(dimensionDto: DimensionDto): Observable<any> {
    return this.http.post(this.dimensionsUrl, dimensionDto, httpOptions);
  }

  updateDimension(dimensionDto: DimensionDto): Observable<any> {
    return this.http.put(this.dimensionsUrl, dimensionDto, httpOptions);
  }

  deleteDimension(dimensionDto: DimensionDto): Observable<any> {
    return this.http.delete(this.dimensionsUrl + '/' + dimensionDto.id);
  }
}
