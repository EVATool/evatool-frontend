import {EventEmitter, Injectable, Output} from '@angular/core';
import {LogService} from './log.service';
import {environment} from '../../environments/environment';
import {RestService} from './rest.service';
import {HttpClient} from '@angular/common/http';
import {SampleDataService} from './sample-data.service';
import {Router} from '@angular/router';
import {ROUTES} from '../app-routes';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends RestService {

  authenticated = false;
  private token: string | null = null;
  tokenExpiresIn = 0;
  private refreshToken: string | null = null;
  refreshTokenExpiresIn = 0;

  username = '';
  password = '';

  constructor(protected logger: LogService,
              protected http: HttpClient,
              protected sampleData: SampleDataService,
              private router: Router) {
    super(logger, http, sampleData);
  }

  getToken(): string {
    if (environment.useAuth) {
      if (!this.refreshTokenExpiresIn || this.refreshTokenExpiresIn <= 0) {
        this.getInitialToken();
      } else {
        this.refreshExistingToken();
      }
    }
    return this.token || '';
  }

  getInitialToken(): void {
    const authRequest = 'grant_type=password' +
      '&scope=openid' +
      '&client_id=' + this.authClient +
      '&username=' + this.username +
      '&password=' + this.password;

    this.http.post(this.authUrl, authRequest, this.httpAuthOptions).subscribe((authResponse: any) => {
      this.takeInAuthResponse(authResponse,);
      this.startTimers();
      this.router.navigate([ROUTES.home]);
    });
  }

  refreshExistingToken(ignoreRefreshToken: boolean = false): void {
    const authRequest = 'grant_type=refresh_token' +
      '&scope=openid' +
      '&client_id=' + this.authClient +
      '&refresh_token=' + this.refreshToken;

    this.http.post<any>(this.authUrl, authRequest, this.httpAuthOptions).subscribe((authResponse: any) => {
      this.takeInAuthResponse(authResponse, ignoreRefreshToken);
    });
  }

  takeInAuthResponse(authResponse: any, ignoreRefreshToken: boolean = false): void {
    this.token = authResponse.access_token;
    this.tokenExpiresIn = authResponse.expires_in;
    if (!ignoreRefreshToken) {
      this.refreshToken = authResponse.refresh_token;
      this.refreshTokenExpiresIn = authResponse.refresh_expires_in;
    }
  }

  startTimers(): void {
    this.authenticated = true;
    const interval = setInterval(() => {
      this.tokenExpiresIn -= 1;
      this.refreshTokenExpiresIn -= 1;

      if (this.tokenExpiresIn === 10) { // Try to get new token with refresh token if token expires in 10 seconds
        this.logger.info(this, 'Refreshing Token...');
        this.refreshExistingToken(true);
      }

      if (this.refreshTokenExpiresIn <= 0) {
        this.authenticated = false;
        this.logout();
      }
    }, 1000);
  }

  logout(): void {
    this.token = null;
    this.tokenExpiresIn = 0;
    this.refreshToken = null;
    this.refreshTokenExpiresIn = 0;
    this.username = '';
    this.password = '';
    this.router.navigate([ROUTES.login]);
  }
}
