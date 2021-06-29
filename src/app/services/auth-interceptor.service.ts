import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/auth/realms/')) { // Leave requests to auth server alone.
      return next.handle(req);
    } else {
      const authToken = this.auth.getToken();
      if (authToken) {
        const authReq = this.injectToken(req, authToken);
        return next.handle(authReq);
      } else {
        return next.handle(req);
      }
    }
  }

  injectToken(req: HttpRequest<any>, authToken: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
  }
}
