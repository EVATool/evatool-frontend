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
      //req = this.addRealm(req);
      return next.handle(req);
    } else {
      const authToken = this.authService.getToken();
      let authReq = this.injectToken(req, authToken);
      authReq = this.addRealm(authReq);
      return next.handle(authReq);
    }
  }

  injectToken(req: HttpRequest<any>, authToken: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
  }

  addRealm(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('Realm', this.authService.tenant)
    });
  }
}
