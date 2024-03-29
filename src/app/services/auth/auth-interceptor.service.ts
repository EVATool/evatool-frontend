import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {LogService} from '../log.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private logger: LogService,
              private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.logger.trace(this, 'intercept');
    if (!environment.authEnabled || this.isAuthUrl(req.url)) { // Leave requests to auth server alone.
      this.logger.debug(this, 'Leaving request alone');
      return next.handle(req);
    } else {
      let authReq = req;
      authReq = this.injectToken(authReq, this.authService.getToken());
      authReq = this.injectRealm(authReq, this.authService.realm);
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

  isAuthUrl(url: string): boolean {
    return url.includes('/auth/');
  }
}
