import {EventEmitter, Injectable, Output} from '@angular/core';
import {LogService} from './log.service';
import {environment} from '../../environments/environment';
import {RestService} from './rest.service';
import {HttpClient} from '@angular/common/http';
import {SampleDataService} from './sample-data.service';
import {AnalysisDto} from '../dto/AnalysisDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends RestService {

  private token!: string;
  private tokenExpiresIn!: number;
  private refreshToken!: string;
  private refreshTokenExpiresIn!: number;

  username = 'admin';
  password = 'admin';

  constructor(protected logger: LogService,
              protected http: HttpClient,
              protected sampleData: SampleDataService) {
    super(logger, http, sampleData);
  }

  getToken(): string {
    if (environment.useAuth) {
      // TODO Setup token and refresh token so that getToken always returns a valid token.
      if (!this.refreshToken) {
        const authRequest = 'grant_type=password' +
          '&scope=openid' +
          '&client_id=' + this.authClient +
          '&username=' + this.username +
          '&password=' + this.password;

        console.log(this.authUrl);
        console.log(authRequest);

        this.http.post(this.authUrl, authRequest, this.httpAuthOptions).subscribe((authResponse: any) => {
          this.takeInAuthResponse(authResponse);
        });
      } else {
        const authRequest = 'grant_type=refresh_token' +
          '&scope=openid' +
          '&client_id=' + this.authClient +
          '&refresh_token=' + this.refreshToken;

        this.http.post<any>(this.authUrl, authRequest, this.httpAuthOptions).subscribe((authResponse: any) => {
          this.takeInAuthResponse(authResponse);
        });
      }
    } else {
      this.token = 'Not used';
      this.refreshToken = 'Not used';
    }
    return this.token;
  }

  takeInAuthResponse(authResponse: any): void {
    this.token = authResponse.access_token;
    this.tokenExpiresIn = authResponse.expires_in;
    this.refreshToken = authResponse.refresh_token;
    this.refreshTokenExpiresIn = authResponse.refresh_expires_in;
  }
}
