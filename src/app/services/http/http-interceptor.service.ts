import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LogService} from '../log.service';
import {HttpMarshallService} from './http-marshall.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  private retryCount = 2;

  constructor(private logger: LogService,
              private httpMarshall: HttpMarshallService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.logger.trace(this, 'intercept');
    return next.handle(request)
      .pipe(
        // retry(this.retryCount);
        tap(
          // Request.
          (data: any) => {
            this.logger.debug(this, 'NEXT');
            this.httpMarshall.next(request);
          },
          // Response error.
          (error: HttpErrorResponse) => {
            let errorMsg = '';
            let functionalErrorCode = null;
            let tag = null;
            if (error.error instanceof ErrorEvent) {
              errorMsg = `Error: ${error.error.message}`;
              this.logger.error(this, 'ERROR: This is a client side error (' + errorMsg + ')');
            } else {
              functionalErrorCode = error.error?.functionalErrorCode;
              tag = error.error?.tag;
              errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
              this.logger.error(this, 'ERROR: This is a server side error  (' + errorMsg + ')');
            }
            const httpStatus = error.error?.status || error.error?.httpStatusCode || error.status;
            this.httpMarshall.error(request, httpStatus, functionalErrorCode, tag);
            return throwError(errorMsg);
          },
          // Response complete.
          () => {
            this.logger.debug(this, 'COMPLETE');
            this.httpMarshall.complete(request);
          })
      );
  }
}
