import {EventEmitter, Injectable, Output} from '@angular/core';
import {LogService} from './log.service';
import {Variant} from '../model/Variant';
import {HttpEvent} from './HttpEvent';
import {HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpLoaderService {
  @Output() httpNext: EventEmitter<HttpEvent> = new EventEmitter();
  @Output() httpError: EventEmitter<HttpEvent> = new EventEmitter();
  @Output() httpComplete: EventEmitter<HttpEvent> = new EventEmitter();
  @Output() numHttpChanges: EventEmitter<number> = new EventEmitter();
  @Output() httpActive: EventEmitter<void> = new EventEmitter();
  @Output() httpNotActive: EventEmitter<void> = new EventEmitter();

  private numHttp = 0;
  httpEvents: HttpEvent[] = [];
  private activeRequests: HttpRequest<any>[] = [];

  constructor(private logger: LogService) {
    // TODO use semaphores?
    // TODO does this increment/decrement of numHttp suffice? There is already a workaround with 'i18n'
  }

  next(request: HttpRequest<any>): void {
    this.logger.info(this, 'An http request started.');
    this.httpNext.emit(this.ackHttpEvent(request));
    this.httpRequest(request);
    this.logger.info(this, 'Active http requests: ' + this.numHttp);
  }

  error(request: HttpRequest<any>): void {
    this.logger.info(this, 'An http response failed.');
    this.httpError.emit(this.ackHttpEvent(request));
    this.httpResponse(request);
    this.logger.info(this, 'Active http requests: ' + this.numHttp);
  }

  complete(request: HttpRequest<any>): void {
    this.logger.info(this, 'An http response was successful.');
    this.httpComplete.emit(this.ackHttpEvent(request));
    this.httpResponse(request);
    this.logger.info(this, 'Active http requests: ' + this.numHttp);
  }

  private httpRequest(request: HttpRequest<any>): void {
    if (!this.activeRequests.includes(request)) {
      this.activeRequests.push(request);

      this.numHttp++;
      this.numHttpChanges.emit(this.numHttp);
      if (this.numHttp > 0) {
        this.httpActive.emit();
      }
    }
  }

  private httpResponse(request: HttpRequest<any>): void {
    if (this.activeRequests.includes(request)) {
      const index: number = this.activeRequests.indexOf(request, 0);
      this.activeRequests.splice(index, 1);

      this.numHttp--;
      //this.numHttp = Math.max(this.numHttp, 0);
      this.numHttpChanges.emit(this.numHttp);
      if (this.numHttp === 0) {
        this.httpNotActive.emit();
      }
    }
  }

  private ackHttpEvent(request: HttpRequest<any>): HttpEvent {
    const httpEvent = new HttpEvent();
    this.httpEvents.push(httpEvent);
    return httpEvent;
  }
}
