import { RestSettings } from './../../settings/RestSettings';
import { DimensionDto } from './../../dtos/DimensionDto';
import { LogService } from '../../../shared/services/log.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DimensionRestService {

  constructor(
    private logger: LogService,
    private http: HttpClient) {

  }

  onInit(): void {

  }

  getDimensions(): Observable<DimensionDto[]> {
    this.logger.info(this, 'Get all Dimensions');
    return this.http.get<DimensionDto[]>(RestSettings.dimensionsUrl);
  }

  getDimensionTypes(): Observable<string[]> {
    this.logger.info(this, 'Get all DimensionsTypes');
    return this.http.get<string[]>(RestSettings.dimensionTypesUrl);
  }
}
