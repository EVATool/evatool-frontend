import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockableServiceService {

  public testing = false;
  public mocked = false;

  public useDummyData(offline: boolean) {
    return this.mocked || (!this.testing && offline);
  }

  constructor() {
  }
}
