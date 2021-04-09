import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockableService {

  public testing = false;
  public mocked = false;

  public useDummyData(offline: boolean) {
    return this.mocked || (!this.testing && offline);
  }

  constructor() {
  }
}
