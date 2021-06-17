import {EventEmitter, Injectable, Output} from '@angular/core';
import {LogService} from './log.service';
import {Variant} from '../model/Variant';

@Injectable({
  providedIn: 'root'
})
export class HttpLoaderService {
  @Output() httpNext: EventEmitter<void> = new EventEmitter();
  @Output() httpError: EventEmitter<void> = new EventEmitter();
  @Output() httpComplete: EventEmitter<void> = new EventEmitter();
  @Output() numHttpChanges: EventEmitter<void> = new EventEmitter();

  private numHttp = 0;

  constructor(private logger: LogService) {
    // TODO use semaphores?
    // TODO does this increment/decrement of numHttp succife? There is already a workaround with 'i18n'
  }

  next(): void {
    this.logger.info(this, 'An http request started.');
    this.httpRequest();
    console.log(this.numHttp);
  }

  error(): void {
    this.logger.info(this, 'An http response failed.');
    this.httpResponse();
    console.log(this.numHttp);
  }

  complete(): void {
    this.logger.info(this, 'An http response was successful.');
    this.httpResponse();
    console.log(this.numHttp);
  }

  private httpRequest(): void {
    this.numHttp++;
  }

  private httpResponse(): void {
    this.numHttp--;
    this.numHttp = Math.max(this.numHttp, 0);
  }
}
