import { RestSettings } from '../../settings/RestSettings';
import { ValueDto } from '../../dtos/ValueDto';
import { LogService } from '../../../shared/services/log.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueRestService {

  constructor(
    private logger: LogService,
    private http: HttpClient) {

  }

  onInit(): void {

  }

  getValues(): Observable<ValueDto[]> {
    this.logger.info(this, 'Get all Values');
    return this.http.get<ValueDto[]>(RestSettings.valuesUrl);
  }

  getValueTypes(): Observable<string[]> {
    this.logger.info(this, 'Get all ValueTypes');
    return this.http.get<string[]>(RestSettings.valueTypesUrl);
  }
}
