import { TestBed } from '@angular/core/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {VariantRestService} from './variant-rest.service';
import {Injectable} from '@angular/core';
import {LogService} from '../../shared/services/log.service';
import {Observable, of} from 'rxjs';
import {VariantDTO} from '../models/VariantDTO';
import {VariantSampleDataService} from './spec/sample-data.service';

@Injectable({
  providedIn: 'root'
})
export class MockedVariantRestService extends VariantRestService {

  constructor(
    logger: LogService,
    http: HttpClient,
    private sampleData: VariantSampleDataService) {
    super( http);
  }

  getVariants(): Observable<any> {
    return of(this.sampleData.getDummyVariantDTOs());
  }

  deleteVariants(id: string): Observable<any> {
    this.sampleData.delete();
    return of(this.sampleData.getDummyVariantDTO());
  }

  updateVariants(variantDTO: VariantDTO): Observable<any> {
    this.sampleData.update();
    return of(this.sampleData.getDummyVariantDTOs());
  }

  getVariantsById(id: any): Observable<any> {
    return of(this.sampleData.getDummyVariantDTO());
  }
  createVariants(variantDTO: VariantDTO): Observable<any> {
    return of(this.sampleData.getDummyVariantDTO());
  }

  getVariantsByAnalysisId(id: any): Observable<any> {
    return of(this.sampleData.getDummyVariantDTOs());
  }
}
