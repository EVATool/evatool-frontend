import {Injectable} from '@angular/core';
import {LogService} from './log.service';
import {RestService} from './rest.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SampleDataService} from './sample-data.service';
import {Router} from '@angular/router';
import {ROUTES} from '../app-routes';
import {Constants} from './rest/app-constants';
import * as uuid from 'uuid';

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

  getLoginRequest(username: string, password: string, clientId: string = 'evatool-app'): string {
    return 'grant_type=password' +
      '&scope=openid' +
      '&client_id=' + clientId +
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
  // TODO check if username already exists + good error message (if realm already exists, keycloak returns 409).
  // TODO reimporting with different realm name also causes 409, but it shouldnt.
  // TODO easy way for admin to add realm for customer if registration is disabled (when masked in backend, send email with credentials to email).
  // TODO forgot password and activate account with link in email (email features)
  // TODO The standalone version of EvaTool MUST use users in evatool-realm as proxy for realms (keycloak cannot handle multiple hundred realms!).
  register(username: string, password: string, email: string): void {
    const adminUsername = 'admin';
    const adminPassword = 'admin';
    const adminClientId = 'admin-cli';
    const authRequest = this.getLoginRequest(adminUsername, adminPassword, adminClientId);

    this.http.post(this.getAuthUrl('master'), authRequest, this.httpAuthOptions).subscribe((authResponse: any) => {
      const adminToken = authResponse.access_token;

      // Change realm name.
      // @ts-ignore
      let createRealmJson = Constants.realmJson.replaceAll('evatool-realm', username); // TODO Why does replaceAll have to be ts-ignored?

      // Change ids.
      createRealmJson = this.reassignIds(createRealmJson);

      // Http options.
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + adminToken
      });
      const options = {headers};

      // TODO Remove users from json.

      // Post realm and login after insert.
      this.http.post(this.realmUrl, createRealmJson, options).subscribe(() => {
        console.log('REALM REQ SUCCESS');

        // TODO after realm is created, create user with reader and writer roles that has the just inputted username, email and password.

        this.login(username, username, password);
      });
    });
  }

  reassignIds(json: string): string {
    const lines = json.split('\n');

    for (const line of lines) {

      // Check if id is in line.
      if (line.toLowerCase().includes('id" : ')) {

        // Retrieve id from line.
        // @ts-ignore
        const oldId = line.split(':')[1].trim().replaceAll('"', '').replaceAll(',', '');

        // Check if id is UUID
        if (uuid.validate(oldId)) {
          // Change id in whole json.
          const newId = uuid.v4();
          // @ts-ignore
          json = json.replaceAll(oldId, newId);
        }
      }
    }

    return json;
  }
}
