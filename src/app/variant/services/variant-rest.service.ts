import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {VariantDTO} from '../models/VariantDTO';
import {RestService} from '../../shared/services/rest.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class VariantRestService {

  constructor(private http: HttpClient){}


  /***
   * Get all Variants.
   */
  getVariants(): Observable<any> {
    return this.http.get<any>(RestService.getVariantsURL());
  }

  /**
   * Get a Variant by ID.
   * @param VariantsId
   */
  getVariantsById(id: any): Observable<any> {
    return this.http.get<any>(RestService.getVariantsURL() + '/' + id);
  }

  /**
   * Get Variants by AnalysisID.
   * @param AnalysisID
   */
  getVariantsByAnalysisId(id: any): Observable<any> {
    return this.http.get<any>(RestService.getVariantsURL() + '?analysisId=' + id);
  }

  /**
   * Create Variants.
   * @param variantDTO
   */
  createVariants(variantDTO: VariantDTO): Observable<any> {
    return this.http.post(RestService.getVariantsURL(), variantDTO, httpOptions);
  }

  /**
   * Update Variants.
   * @param variantDTO
   */
  updateVariants(variantDTO: VariantDTO): Observable<any> {
    return this.http.put(RestService.getVariantsURL(), variantDTO, httpOptions);
  }

  /**
   * Delete Variant by ID.
   * @param VariantsId
   */
  deleteVariants(id: string): Observable<any> {
    return this.http.delete(RestService.getVariantsURL() + '/' + id);
  }

}
