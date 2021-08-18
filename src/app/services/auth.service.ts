import {EventEmitter, Injectable, Output} from '@angular/core';
import {LogService} from './log.service';
import {RestService} from './rest.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  authenticated = false;
  private token = 'null'; // TODO sending an empty string causes a 500 return code. This should be handled in backend.
  tokenExpiresIn = 0;
  private refreshToken = 'null';
  refreshTokenExpiresIn = 0;

  isAutoRefreshing = false;

  realm = '';
  username = '';
  password = '';

  constructor(protected logger: LogService,
              protected http: HttpClient,
              protected sampleData: SampleDataService,
              private router: Router) {
    super(logger, http, sampleData);
  }

  login(realm: string, username: string, password: string): void {
    if (realm === '') {
      realm = 'evatool-realm';
    }

    this.http.post<AuthTokenDto>(
      this.authLoginUrl + '?username=' + username + '&password=' + password + '&realm=' + realm, null, this.httpOptions)
      .subscribe((response: AuthTokenDto) => {
        this.realm = realm;
        this.username = username;
        this.password = password; // TODO do not save or purge password so its not in memory. It is not required for refreshing the token.
        this.takeInAuthResponse(response);
        this.startTimers();
        this.router.navigate([ROUTES.home]);
      });
  }

  getToken(): string {
    if (!this.refreshTokenExpiresIn || this.refreshTokenExpiresIn <= 0) {
      this.login(this.realm, this.username, this.password);
    } else {
      this.refreshExistingToken();
    }
    return this.token;
  }

  refreshExistingToken(ignoreRefreshToken: boolean = false): void {
    this.http.post<AuthTokenDto>(
      this.authRefreshLoginUrl + '?refreshToken=' + this.refreshToken + '&realm=' + this.realm, null, this.httpOptions)
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
    this.password = '';
    this.router.navigate([ROUTES.login]);
  }

  registerUser(username: string, email: string, password: string): void {
    this.http.post<AuthRegisterUserDto>(
      this.authRegisterUserUrl +
      '?username=' + username +
      '&email=' + email +
      '&password=' + password,
      null, this.httpOptions)
      .subscribe((response: AuthRegisterUserDto) => {
        this.login('evatool-realm', username, password);
      });
  }

  registerRealm(adminUsername: string, adminPassword: string, realm: string): void {
    this.http.post<AuthRegisterRealmDto>(
      this.authRegisterRealmUrl +
      '?authAdminUsername=' + adminUsername +
      '&authAdminPassword=' + adminPassword +
      '&realm=' + realm,
      null, this.httpOptions)
      .subscribe((response: AuthRegisterRealmDto) => {
        this.realmRegistered.emit(response.realm);
      });
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

  takeInAuthResponse(authTokenDto: AuthTokenDto, ignoreRefreshToken: boolean = false): void {
    this.token = authTokenDto.token;
    this.tokenExpiresIn = authTokenDto.tokenExpiresIn;
    if (!ignoreRefreshToken) {
      this.refreshToken = authTokenDto.refreshToken;
      this.refreshTokenExpiresIn = authTokenDto.refreshTokenExpiresIn;
    } else {
      this.isAutoRefreshing = false;
    }
  }
}
