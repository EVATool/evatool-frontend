import {EventEmitter, Injectable, Output} from '@angular/core';
import {LogService} from './log.service';
import {HttpInfo, HttpInfoType} from './HttpInfo';
import {HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpMarshallService {
  @Output() httpNext: EventEmitter<HttpInfo> = new EventEmitter();
  @Output() httpError: EventEmitter<HttpInfo> = new EventEmitter();
  @Output() httpComplete: EventEmitter<HttpInfo> = new EventEmitter();

  @Output() numHttpChanges: EventEmitter<number> = new EventEmitter();
  @Output() httpActive: EventEmitter<void> = new EventEmitter();
  @Output() httpNotActive: EventEmitter<HttpInfo> = new EventEmitter();

  numHttp = 0;
  private activeRequests: HttpRequest<any>[] = [];

  constructor(private logger: LogService) {
  }

  next(request: HttpRequest<any>): void {
    this.logger.info(this, 'An http request started.');
    const httpInfo = this.buildHttpInfo(request, HttpInfoType.Next);
    this.httpNext.emit(httpInfo);
    this.httpRequest(request, httpInfo);
    this.logger.info(this, 'Active http requests: ' + this.numHttp);
  }

  error(request: HttpRequest<any>, httpStatusCode: number, functionalErrorCode: number, tag: any): void {
    this.logger.info(this, 'An http response failed.');
    const httpInfo = this.buildHttpInfo(request, HttpInfoType.Error, functionalErrorCode, tag, httpStatusCode);
    this.httpError.emit(httpInfo);
    this.processHttpResponse(request, httpInfo);
    this.logger.info(this, 'Active http requests: ' + this.numHttp);
  }

  complete(request: HttpRequest<any>): void {
    this.logger.info(this, 'An http response was successful.');
    const httpInfo = this.buildHttpInfo(request, HttpInfoType.Complete);
    this.httpComplete.emit(httpInfo);
    this.processHttpResponse(request, httpInfo);
    this.logger.info(this, 'Active http requests: ' + this.numHttp);
  }

  private httpRequest(request: HttpRequest<any>, httpInfo: HttpInfo): void {
    if (!this.activeRequests.includes(request)) {
      this.activeRequests.push(request);

      this.numHttp++;
      this.numHttpChanges.emit(this.numHttp);
      if (this.numHttp > 0) {
        this.httpActive.emit();
      }
    }
  }

  private processHttpResponse(request: HttpRequest<any>, httpInfo: HttpInfo): void {
    if (this.activeRequests.includes(request)) {
      const index: number = this.activeRequests.indexOf(request, 0);
      this.activeRequests.splice(index, 1);

      this.numHttp--;
      this.numHttpChanges.emit(this.numHttp);
      if (this.numHttp === 0) {
        this.httpNotActive.emit(httpInfo);
      }
    }
  }

  private buildHttpInfo(request: HttpRequest<any>, httpInfoType: HttpInfoType, functionalErrorCode?: number, tag?: any, httpStatusCode?: number): HttpInfo {
    const httpInfo = new HttpInfo();
    httpInfo.timestamp = Date.now().valueOf();
    httpInfo.path = request.url;
    httpInfo.method = request.method;
    httpInfo.httpStatusCode = httpStatusCode == null ? -1 : httpStatusCode;
    httpInfo.type = httpInfoType;
    httpInfo.functionalErrorCode = functionalErrorCode;
    httpInfo.tag = tag;
    return httpInfo;
  }
}
