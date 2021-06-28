import {EventEmitter, Injectable, Output} from '@angular/core';
import {LogService} from './log.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() authorizationInitialized: EventEmitter<void> = new EventEmitter();

  private token!: string;
  private refreshToken!: string;

  constructor(private logger: LogService) {
  }

  init(): void {
    if (environment.useAuth) {
      // TODO Setup token and refresh token so that getToken always returns a valid token.
      this.token = 'lel';
      this.authorizationInitialized.emit();
    } else {
      this.token = 'TEST';
      this.refreshToken = 'ALSO TEST';
      this.authorizationInitialized.emit();
    }
  }

  getToken(): string {
    return this.token;
  }
}
