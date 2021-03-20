import { RestSettings } from '../../settings/RestSettings';
import { DimensionDto } from '../../dtos/DimensionDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DimensionRestService {

  constructor(private http: HttpClient) {

  }

  onInit(): void {

  }

  getDimensions(): Observable<DimensionDto[]> {
    return this.http.get<DimensionDto[]>(RestSettings.dimensionsUrl);
  }

  getDimensionTypes(): Observable<string[]> {
    return this.http.get<string[]>(RestSettings.dimensionsUrl + '/types');
  }

  createDimension(dimensionDto: DimensionDto): Observable<any> {
    return this.http.post(RestSettings.dimensionsUrl, dimensionDto, RestSettings.httpOptions);
  }

  updateDimension(dimensionDto: DimensionDto): Observable<any> {
    return this.http.put(RestSettings.dimensionsUrl, dimensionDto, RestSettings.httpOptions);
  }

  deleteDimension(dimensionDto: DimensionDto): Observable<any> {
    return this.http.delete(RestSettings.dimensionsUrl + '/' + dimensionDto.id);
  }
}
