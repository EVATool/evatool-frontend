import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class XsrfInterceptor implements HttpInterceptor {

  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let requestMethod: string = req.method;
    requestMethod = requestMethod.toLowerCase();

    console.log(this.tokenExtractor.getToken());
    req = req.clone({withCredentials: true});

    if (requestMethod && (requestMethod === 'post' || requestMethod === 'delete' || requestMethod === 'put')) {
      const headerName = 'X-XSRF-TOKEN';
      const token = this.tokenExtractor.getToken() as string;
      if (token !== null && !req.headers.has(headerName)) {
        req = req.clone({headers: req.headers.set(headerName, token)});
      }
    } else if (requestMethod && requestMethod === 'get') {
    }

    return next.handle(req);
  }
}
