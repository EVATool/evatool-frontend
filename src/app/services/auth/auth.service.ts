import {EventEmitter, Injectable, OnDestroy, Output} from '@angular/core';
import {LogService} from '../log.service';
import {RestService} from '../rest/rest.service';
import {HttpClient} from '@angular/common/http';
import {SampleDataService} from '../sample-data.service';
import {Router} from '@angular/router';
import {ROUTES} from '../../app-routes';
import {AuthTokenDto} from '../../dto/AuthTokenDto';
import {AuthRegisterRealmDto} from '../../dto/AuthRegisterRealmDto';
import {AuthRegisterUserDto} from '../../dto/AuthRegisterUserDto';
import {environment} from '../../../environments/environment';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends RestService implements OnDestroy {

  private ngUnsubscribe = new Subject();

  @Output() realmRegistered: EventEmitter<string> = new EventEmitter();

  authenticated = false;
  isAutoRefreshing = false;

  private _token = '';
  tokenExpiresIn = 0;
  readonly TOKEN_LOCAL_STORAGE_KEY = 'auth_token';

  public get token(): string {
    return this._token;
  }

  public set token(token: string) {
    this._token = token;
    localStorage.setItem(this.TOKEN_LOCAL_STORAGE_KEY, this.token);
  }


  private _refreshToken = '';
  refreshTokenExpiresIn = 0;
  readonly REFRESH_TOKEN_LOCAL_STORAGE_KEY = 'auth_refresh_token';

  public get refreshToken(): string {
    return this._refreshToken;
  }

  public set refreshToken(refreshToken: string) {
    this._refreshToken = refreshToken;
    localStorage.setItem(this.REFRESH_TOKEN_LOCAL_STORAGE_KEY, this.refreshToken);
  }


  private _realm = '';
  readonly REALM_LOCAL_STORAGE_KEY = 'auth_realm';

  public get realm(): string {
    return this._realm;
  }

  public set realm(realm: string) {
    this._realm = realm;
    localStorage.setItem(this.REALM_LOCAL_STORAGE_KEY, this.realm);
  }


  _username = '';
  readonly USERNAME_LOCAL_STORAGE_KEY = 'auth_username';

  public get username(): string {
    return this._username;
  }

  public set username(username: string) {
    this._username = username;
    localStorage.setItem(this.USERNAME_LOCAL_STORAGE_KEY, this.username);
  }


  constructor(protected logger: LogService,
              protected http: HttpClient,
              protected sampleData: SampleDataService,
              private router: Router) {
    super(logger, http, sampleData);

    const cachedToken = localStorage.getItem(this.TOKEN_LOCAL_STORAGE_KEY);
    if (cachedToken) {
      this._token = cachedToken;
    }

    const cachedRefreshToken = localStorage.getItem(this.REFRESH_TOKEN_LOCAL_STORAGE_KEY);
    if (cachedRefreshToken) {
      this._refreshToken = cachedRefreshToken;
    }

    const cachedRealm = localStorage.getItem(this.REALM_LOCAL_STORAGE_KEY);
    if (cachedRealm) {
      this._realm = cachedRealm;
    }

    const cachedUsername = localStorage.getItem(this.USERNAME_LOCAL_STORAGE_KEY);
    if (cachedUsername) {
      this._username = cachedUsername;
    }

    if (environment.authEnabled) {
      this.startTimer();
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getToken(): string {
    this.refreshExistingToken();
    return this.token;
  }

  login(realm: string, username: string, password: string): void {
    this.logger.trace(this, 'Login');
    if (realm === '') {
      realm = 'evatool-realm';
    }

    this.http.post<AuthTokenDto>(
      this.authLoginUrl + '?username=' + username + '&password=' + password + '&realm=' + realm, null, this.httpOptions)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((response: AuthTokenDto) => {
      this.realm = realm;
      this.username = username;
      this.takeInAuthResponse(response);
      this.router.navigate([ROUTES.home]);
    });
  }

  refreshExistingToken(ignoreRefreshToken: boolean = false): void {
    this.logger.trace(this, 'Refresh Existing Token');
    if (this.refreshToken === '') {
      this.router.navigate([ROUTES.login]);
      return;
    }

    const url = this.authRefreshLoginUrl + '?refreshToken=' + this.refreshToken + '&realm=' + this.realm;
    this.logger.debug(this, 'Http post to: ' + url);
    this.http.post<AuthTokenDto>(url, null, this.httpOptions)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((response: AuthTokenDto) => {
      this.takeInAuthResponse(response, ignoreRefreshToken);
    });
  }

  logout(): void {
    this.logger.trace(this, 'Logout');
    this.authenticated = false;
    this.token = '';
    this.tokenExpiresIn = 0;
    this.refreshToken = '';
    this.refreshTokenExpiresIn = 0;
    this.realm = '';
    this.username = '';
    this.router.navigate([ROUTES.login]);
  }

  registerUser(username: string, email: string, password: string): void {
    this.logger.trace(this, 'Register User');
    const url = this.authRegisterUserUrl +
      '?username=' + username +
      '&email=' + email +
      '&password=' + password;
    this.logger.debug(this, 'Http post to: ' + url);
    this.http.post<AuthRegisterUserDto>(url, null, this.httpOptions)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((response: AuthRegisterUserDto) => {
      this.login('evatool-realm', username, password);
    });
  }

  registerRealm(adminUsername: string, adminPassword: string, realm: string): void {
    this.logger.trace(this, 'Register Realm');
    const url = this.authRegisterRealmUrl +
      '?authAdminUsername=' + adminUsername +
      '&authAdminPassword=' + adminPassword +
      '&realm=' + realm;
    this.logger.debug(this, 'Http post to: ' + url);
    this.http.post<AuthRegisterRealmDto>(url, null, this.httpOptions)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((response: AuthRegisterRealmDto) => {
      this.realmRegistered.emit(response.realm);
    });
  }

  takeInAuthResponse(authTokenDto: AuthTokenDto, ignoreRefreshToken: boolean = false): void {
    this.logger.trace(this, 'Take In Auth Response');
    this.token = authTokenDto.token;
    this.tokenExpiresIn = authTokenDto.tokenExpiresIn;
    if (!ignoreRefreshToken) {
      this.refreshToken = authTokenDto.refreshToken;
      this.refreshTokenExpiresIn = authTokenDto.refreshTokenExpiresIn;
    } else {
      this.isAutoRefreshing = false;
    }
    this.authenticated = true;
  }

  startTimer(): void {
    this.logger.trace(this, 'Start Timer');
    const interval = setInterval(() => {
      if (this.authenticated) {
        this.tokenExpiresIn -= 1;
        this.refreshTokenExpiresIn -= 1;

        // Try to get new token with refresh token if token expires soon.
        if (this.tokenExpiresIn <= 15 && !this.isAutoRefreshing && this.authenticated) {
          this.isAutoRefreshing = true;
          this.logger.debug(this, 'Automatically refreshing existing token...');
          this.refreshExistingToken(true);
        }

        if (this.refreshTokenExpiresIn <= 0) {
          this.logout();
        }
      }
    }, 1000);
  }
}
