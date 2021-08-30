import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LogService} from '../log.service';
import {environment} from '../../../environments/environment';


@Injectable()
export class XsrfInterceptor implements HttpInterceptor {

  constructor(private tokenExtractor: HttpXsrfTokenExtractor,
              private logger: LogService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (environment.authEnabled) {
      let requestMethod: string = req.method;
      requestMethod = requestMethod.toLowerCase();

      this.logger.info(this, 'XSRF-TOKEN: ' + this.tokenExtractor.getToken());
      req = req.clone({withCredentials: true});

      if (requestMethod && (requestMethod === 'post' || requestMethod === 'delete' || requestMethod === 'put')) {
        const headerName = 'X-XSRF-TOKEN';
        const token = this.tokenExtractor.getToken() as string;
        if (token !== null && !req.headers.has(headerName)) {
          req = req.clone({headers: req.headers.set(headerName, token)});
        }
      }
    }

    return next.handle(req);
  }
}
