import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {retry, tap} from 'rxjs/operators';
import {LogService} from './log.service';
import {HttpLoaderService} from './http-loader.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  private retryCount = 2;

  constructor(private logger: LogService,
              private httpLoader: HttpLoaderService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        //retry(this.retryCount);
        tap(
          // Request.
          (data: any) => {
            this.logger.info(this, 'NEXT');
            if (!request.url.includes('/i18n/')) {
              this.httpLoader.next();
            }
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
            this.httpLoader.error();
            return throwError(errorMsg);
          },
          // Response complete.
          () => {
            this.logger.info(this, 'COMPLETE');
            this.httpLoader.complete();
          })
      );
  }
}
