import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LogService} from './log.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private logger: LogService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(tap(
        // Request.
        (data: any) => {
          this.logger.info(this, 'NEXT');
        },
        // Response error.
        (error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            this.logger.error(this, 'ERROR: This is a client side error');
            errorMsg = `Error: ${error.error.message}`;
          } else {
            this.logger.error(this, 'ERROR: This is a server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          this.logger.error(this, errorMsg);
          return throwError(errorMsg);
        },
        // Response complete.
        () => {
          this.logger.info(this, 'COMPLETE');
        })
      );
  }
}
