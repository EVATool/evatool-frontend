import {Injectable} from '@angular/core';
import {LogService} from './log.service';
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
  private token = 'null'; // TODO sending an empty string causes a 500 return code. This should be handled in backend.
  tokenExpiresIn = 0;
  private refreshToken = 'null';
  refreshTokenExpiresIn = 0;

  isAutoRefreshing = false;

  tenant = '';
  username = '';
  password = '';

  constructor(protected logger: LogService,
              protected http: HttpClient,
              protected sampleData: SampleDataService,
              private router: Router) {
    super(logger, http, sampleData);
  }

  getToken(): string {
    if (!this.refreshTokenExpiresIn || this.refreshTokenExpiresIn <= 0) {
      this.login(this.tenant, this.username, this.password);
    } else {
      this.refreshExistingToken();
    }
    return this.token;
  }

  getLoginRequest(username: string, password: string): string {
    return 'grant_type=password' +
      '&scope=openid' +
      '&client_id=evatool-app' +
      '&username=' + username +
      '&password=' + password;

  }

  login(tenant: string, username: string, password: string): void {
    const authRequest = this.getLoginRequest(username, password);

    if (tenant === '') {
      tenant = 'evatool-realm';
    }

    this.http.post(this.getAuthUrl(tenant), authRequest, this.httpAuthOptions).subscribe((authResponse: any) => {
      this.tenant = tenant;
      this.username = username;
      this.password = password; // TODO do not save or purge password so its not in memory. It is not required for refreshing the token.
      this.takeInAuthResponse(authResponse);
      this.startTimers();
      this.router.navigate([ROUTES.home]);
    });
  }

  refreshExistingToken(ignoreRefreshToken: boolean = false): void {
    const authRequest = 'grant_type=refresh_token' +
      '&scope=openid' +
      '&client_id=evatool-app' +
      '&refresh_token=' + this.refreshToken;

    this.http.post<any>(this.getAuthUrl(this.tenant), authRequest, this.httpAuthOptions).subscribe((authResponse: any) => {
      this.takeInAuthResponse(authResponse, ignoreRefreshToken);
    });
  }

  takeInAuthResponse(authResponse: any, ignoreRefreshToken: boolean = false): void {
    this.token = authResponse.access_token;
    this.tokenExpiresIn = authResponse.expires_in;
    if (!ignoreRefreshToken) {
      this.refreshToken = authResponse.refresh_token;
      this.refreshTokenExpiresIn = authResponse.refresh_expires_in;
    } else {
      this.isAutoRefreshing = false;
    }
  }

  startTimers(): void {
    this.authenticated = true;
    const interval = setInterval(() => {
      if (!this.authenticated) {
        clearInterval(interval);
      }

      this.tokenExpiresIn -= 1;
      this.refreshTokenExpiresIn -= 1;

      // Try to get new token with refresh token if token expires soon.
      if (this.tokenExpiresIn <= 15 && !this.isAutoRefreshing && this.authenticated) {
        this.isAutoRefreshing = true;
        this.logger.info(this, 'Refreshing Token...');
        this.refreshExistingToken(true);
      }

      if (this.refreshTokenExpiresIn <= 0) {
        this.logout();
      }
    }, 1000);
  }

  logout(): void {
    this.authenticated = false;
    this.token = 'null';
    this.tokenExpiresIn = 0;
    this.refreshToken = 'null';
    this.refreshTokenExpiresIn = 0;
    this.tenant = '';
    this.username = '';
    this.password = '';
    this.router.navigate([ROUTES.login]);
  }

  // TODO add first and last name?
  // TODO add validation to username + email to not break json when replacing and enforce valid email.
  // TODO check if username already exists + good error message
  registration(username: string, password: string, email: string): void {
    const adminUsername = 'admin';
    const adminPassword = 'admin';
    const authRequest = this.getLoginRequest(adminUsername, adminPassword);

    this.http.post(this.getAuthUrl('master'), authRequest, this.httpAuthOptions).subscribe((authResponse: any) => {
      const adminToken = authResponse.access_token;
      // TODO send realm json with modified realm name...
      const realmJson = ''.replace('evatool-realm', username);

      // TODO Create realm http request



    });
  }
}
