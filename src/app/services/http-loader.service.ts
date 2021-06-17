import {EventEmitter, Injectable, Output} from '@angular/core';
import {LogService} from './log.service';
import {HttpEvent, HttpEventType} from './HttpEvent';
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
  @Output() httpNotActive: EventEmitter<HttpEvent> = new EventEmitter();

  numHttp = 0;
  httpEvents: HttpEvent[] = [];
  private activeRequests: HttpRequest<any>[] = [];

  constructor(private logger: LogService) {
  }

  next(request: HttpRequest<any>): void {
    this.logger.info(this, 'An http request started.');
    const httpEvent = this.ackHttpEvent(request, HttpEventType.Next);
    this.httpNext.emit(httpEvent);
    this.httpRequest(request, httpEvent);
    this.logger.info(this, 'Active http requests: ' + this.numHttp);
  }

  error(request: HttpRequest<any>): void {
    this.logger.info(this, 'An http response failed.');
    const httpEvent = this.ackHttpEvent(request, HttpEventType.Error);
    this.httpError.emit(httpEvent);
    this.httpResponse(request, httpEvent);
    this.logger.info(this, 'Active http requests: ' + this.numHttp);
  }

  complete(request: HttpRequest<any>): void {
    this.logger.info(this, 'An http response was successful.');
    const httpEvent = this.ackHttpEvent(request, HttpEventType.Complete);
    this.httpComplete.emit(httpEvent);
    this.httpResponse(request, httpEvent);
    this.logger.info(this, 'Active http requests: ' + this.numHttp);
  }

  private httpRequest(request: HttpRequest<any>, httpEvent: HttpEvent): void {
    if (!this.activeRequests.includes(request)) {
      this.activeRequests.push(request);

      this.numHttp++;
      this.numHttpChanges.emit(this.numHttp);
      if (this.numHttp > 0) {
        this.httpActive.emit();
      }
    }
  }

  private httpResponse(request: HttpRequest<any>, httpEvent: HttpEvent): void {
    if (this.activeRequests.includes(request)) {
      const index: number = this.activeRequests.indexOf(request, 0);
      this.activeRequests.splice(index, 1);

      this.numHttp--;
      this.numHttpChanges.emit(this.numHttp);
      if (this.numHttp === 0) {
        this.httpNotActive.emit(httpEvent);
      }
    }
  }

  private ackHttpEvent(request: HttpRequest<any>, httpEventType: HttpEventType): HttpEvent {
    const httpEvent = new HttpEvent();
    httpEvent.message = '';
    httpEvent.timestamp = Date.now().toPrecision();
    httpEvent.type = httpEventType;
    this.httpEvents.push(httpEvent);
    return httpEvent;
  }
}
