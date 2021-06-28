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

  authEnabled = environment.useAuth;
  private token!: string;
  tokenExpiresIn!: number;
  private refreshToken!: string;
  refreshTokenExpiresIn!: number;

  username = 'admin';
  password = 'admin';

  constructor(protected logger: LogService,
              protected http: HttpClient,
              protected sampleData: SampleDataService,
              private router: Router) {
    super(logger, http, sampleData);
  }

  getToken(): string {
    if (environment.useAuth) {
      if (!this.refreshToken) {
        this.getInitialToken();
      } else {
        this.refreshExistingToken();
      }
    } else {
      this.token = 'Not used';
      this.refreshToken = 'Not used';
    }
    return this.token;
  }

  getInitialToken(): void {
    const authRequest = 'grant_type=password' +
      '&scope=openid' +
      '&client_id=' + this.authClient +
      '&username=' + this.username +
      '&password=' + this.password;

    console.log(this.authUrl);
    console.log(authRequest);

    this.http.post(this.authUrl, authRequest, this.httpAuthOptions).subscribe((authResponse: any) => {
      this.takeInAuthResponse(authResponse);
      this.startTimers();
    });
  }

  refreshExistingToken(): void {
    const authRequest = 'grant_type=refresh_token' +
      '&scope=openid' +
      '&client_id=' + this.authClient +
      '&refresh_token=' + this.refreshToken;

    this.http.post<any>(this.authUrl, authRequest, this.httpAuthOptions).subscribe((authResponse: any) => {
      this.takeInAuthResponse(authResponse);
    });
  }

  takeInAuthResponse(authResponse: any): void {
    this.token = authResponse.access_token;
    this.tokenExpiresIn = authResponse.expires_in;
    this.refreshToken = authResponse.refresh_token;
    this.refreshTokenExpiresIn = authResponse.refresh_expires_in;
  }

  startTimers(): void {
    const interval = setInterval(() => {
      this.tokenExpiresIn -= 1;
      this.refreshTokenExpiresIn -= 1;

      if (this.tokenExpiresIn < 0) {
        this.router.navigate([ROUTES.login]);
      }
    }, 1000);
  }
}
