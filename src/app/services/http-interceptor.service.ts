import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LogService} from './log.service';
import {HttpLoaderService} from './http-loader.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  @Output() httpNext: EventEmitter<HttpRequest<any>> = new EventEmitter();
  @Output() httpError: EventEmitter<HttpRequest<any>> = new EventEmitter();
  @Output() httpComplete: EventEmitter<HttpRequest<any>> = new EventEmitter();

  private retryCount = 2;

  constructor(private logger: LogService,
              private httpLoader: HttpLoaderService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        // retry(this.retryCount);
        tap(
          // Request.
          (data: any) => {
            this.logger.info(this, 'NEXT');
            this.httpLoader.next(request);
          },
          // Response error.
          (error: HttpErrorResponse) => {
            let errorMsg = '';
            let functionalErrorCode = null;
            let tag = null;
            if (error.error instanceof ErrorEvent) {
              this.logger.error(this, 'ERROR: This is a client side error');
              errorMsg = `Error: ${error.error.message}`;
            } else {
              functionalErrorCode = error.error?.functionalErrorCode;
              tag = error.error?.tag;
              this.logger.error(this, 'ERROR: This is a server side error');
              errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            }
            this.logger.error(this, errorMsg);
            const httpStatus = error.error?.status || error.error?.httpStatusCode || error.status;
            this.httpLoader.error(request, httpStatus, functionalErrorCode, tag);
            return throwError(errorMsg);
          },
          // Response complete.
          () => {
            this.logger.info(this, 'COMPLETE');
            this.httpLoader.complete(request);
          })
      );
  }
}
