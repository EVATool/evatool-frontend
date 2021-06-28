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
    if (req.url.includes('/auth/realms/')) { // Leave requests that get token alone.
      return next.handle(req);
    } else {
      const authToken = this.auth.getToken();
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken)
      });
      return next.handle(authReq);
    }
  }
}
