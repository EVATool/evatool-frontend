import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!environment.useAuth || req.url.includes('/auth/realms/')) { // Leave requests to auth server alone.
      return next.handle(req);
    } else {
      let authReq = req;
      authReq = this.injectToken(authReq, this.authService.getToken());
      authReq = this.injectRealm(authReq, this.authService.tenant);
      return next.handle(authReq);
    }
  }

  injectToken(req: HttpRequest<any>, authToken: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
  }

  injectRealm(req: HttpRequest<any>, realm: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('Realm', realm)
    });
  }
}
