import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private static readonly serverURL: string = 'http://79.171.179.211:443/';

  static getVariantsURL(): string {
    return this.serverURL + 'variants';
  }

  static getStakeholdersURL(): string {
    return this.serverURL + 'stakeholders';
  }

  static getImpactsURL(): string {
    return this.serverURL + 'impacts';
  }

  static getAnalysisURL(): string {
    return this.serverURL + 'analysis';
  }

  static getValuesURL(): string {
    return this.serverURL + 'values';
  }

  static getRequirementesURL(): string {
    return this.serverURL + 'requirements';
  }

  static getValueTypesURL(): string {
    return this.serverURL + 'values/types';
  }
}
