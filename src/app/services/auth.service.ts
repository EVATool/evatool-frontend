import {EventEmitter, Injectable, Output} from '@angular/core';
import {LogService} from './log.service';
import {RestService} from './rest.service';
import {HttpClient} from '@angular/common/http';
import {SampleDataService} from './sample-data.service';
import {Router} from '@angular/router';
import {ROUTES} from '../app-routes';
import {AuthTokenDto} from '../dto/AuthTokenDto';
import {AuthRegisterRealmDto} from '../dto/AuthRegisterRealmDto';
import {AuthRegisterUserDto} from '../dto/AuthRegisterUserDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends RestService {
  @Output() realmRegistered: EventEmitter<string> = new EventEmitter();

  readonly TOKEN_LOCAL_STORAGE_KEY = 'auth_token';
  readonly REFRESH_TOKEN_LOCAL_STORAGE_KEY = 'auth_refresh_token';
  readonly REALM_LOCAL_STORAGE_KEY = 'auth_realm';
  readonly USERNAME_LOCAL_STORAGE_KEY = 'auth_username';

  authenticated = false;
  private token = 'null';
  tokenExpiresIn = 0;
  private refreshToken = 'null';
  refreshTokenExpiresIn = 0;

  isAutoRefreshing = false;

  realm = '';
  username = '';

  constructor(protected logger: LogService,
              protected http: HttpClient,
              protected sampleData: SampleDataService,
              private router: Router) {
    super(logger, http, sampleData);

    const cachedToken = localStorage.getItem(this.TOKEN_LOCAL_STORAGE_KEY);
    if (cachedToken) {
      this.token = cachedToken;
    }

    const cachedRefreshToken = localStorage.getItem(this.REFRESH_TOKEN_LOCAL_STORAGE_KEY);
    if (cachedRefreshToken) {
      this.refreshToken = cachedRefreshToken;
    }

    const cachedRealm = localStorage.getItem(this.REALM_LOCAL_STORAGE_KEY);
    if (cachedRealm) {
      this.realm = cachedRealm;
    }

    const cachedUsername = localStorage.getItem(this.USERNAME_LOCAL_STORAGE_KEY);
    if (cachedUsername) {
      this.username = cachedUsername;
    }

    this.startTimers();
  }

  getToken(): string {
    this.refreshExistingToken();
    return this.token;
  }

  login(realm: string, username: string, password: string): void {
    if (realm === '') {
      realm = 'evatool-realm';
    }

    this.http.post<AuthTokenDto>(
      this.authLoginUrl + '?username=' + username + '&password=' + password + '&realm=' + realm, null, this.httpOptions)
      .subscribe((response: AuthTokenDto) => {
        this.realm = realm;
        localStorage.setItem(this.REALM_LOCAL_STORAGE_KEY, this.realm);
        this.username = username;
        localStorage.setItem(this.USERNAME_LOCAL_STORAGE_KEY, this.username);
        this.takeInAuthResponse(response);
        this.router.navigate([ROUTES.home]);
      });
  }

  refreshExistingToken(ignoreRefreshToken: boolean = false): void {
    const url = this.authRefreshLoginUrl + '?refreshToken=' + this.refreshToken + '&realm=' + this.realm;
    this.logger.info(this, 'Http post to: ' + url);
    this.http.post<AuthTokenDto>(url, null, this.httpOptions)
      .subscribe((response: AuthTokenDto) => {
        this.takeInAuthResponse(response, ignoreRefreshToken);
      });
  }

  logout(): void {
    this.authenticated = false;
    this.token = 'null';
    this.tokenExpiresIn = 0;
    this.refreshToken = 'null';
    this.refreshTokenExpiresIn = 0;
    this.realm = '';
    this.username = '';
    this.router.navigate([ROUTES.login]);
  }

  registerUser(username: string, email: string, password: string): void {
    const url = this.authRegisterUserUrl +
      '?username=' + username +
      '&email=' + email +
      '&password=' + password;
    this.logger.info(this, 'Http post to: ' + url);
    this.http.post<AuthRegisterUserDto>(url, null, this.httpOptions)
      .subscribe((response: AuthRegisterUserDto) => {
        this.login('evatool-realm', username, password);
      });
  }

  registerRealm(adminUsername: string, adminPassword: string, realm: string): void {
    const url = this.authRegisterRealmUrl +
      '?authAdminUsername=' + adminUsername +
      '&authAdminPassword=' + adminPassword +
      '&realm=' + realm;
    this.logger.info(this, 'Http post to: ' + url);
    this.http.post<AuthRegisterRealmDto>(url, null, this.httpOptions)
      .subscribe((response: AuthRegisterRealmDto) => {
        this.realmRegistered.emit(response.realm);
      });
  }

  startTimers(): void {
    const interval = setInterval(() => {
      if (!this.authenticated) {
        clearInterval(interval);
      }

      this.tokenExpiresIn -= 1;
      this.refreshTokenExpiresIn -= 1;

      // Try to get new token with refresh token if token expires soon.
      if (this.tokenExpiresIn <= 15 && !this.isAutoRefreshing && this.authenticated) {
        this.isAutoRefreshing = true;
        this.logger.info(this, 'Automatically refreshing existing token...');
        this.refreshExistingToken(true);
      }

      if (this.refreshTokenExpiresIn <= 0) {
        this.logout();
      }
    }, 1000);
  }

  takeInAuthResponse(authTokenDto: AuthTokenDto, ignoreRefreshToken: boolean = false): void {
    this.authenticated = true;
    this.token = authTokenDto.token;
    localStorage.setItem(this.TOKEN_LOCAL_STORAGE_KEY, this.token);
    this.tokenExpiresIn = authTokenDto.tokenExpiresIn;
    if (!ignoreRefreshToken) {
      this.refreshToken = authTokenDto.refreshToken;
      localStorage.setItem(this.REFRESH_TOKEN_LOCAL_STORAGE_KEY, this.refreshToken);
      this.refreshTokenExpiresIn = authTokenDto.refreshTokenExpiresIn;
    } else {
      this.isAutoRefreshing = false;
    }
  }
}
