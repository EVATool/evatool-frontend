import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {LogService} from '../../services/log.service';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {ROUTES} from '../../app-routes';
import {CrossUiEventService} from '../../services/event/cross-ui-event.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {environment} from '../../../environments/environment';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {LoginRealmNotFoundEvent} from '../../services/event/events/http404/LoginRealmNotFoundEvent';
import {LoginUsernameNotFoundEvent} from '../../services/event/events/http404/LoginUsernameNotFoundEvent';
import {UsernameInvalidEvent} from '../../services/event/events/http400/UsernameInvalidEvent';
import {InvalidCredentialsEvent} from '../../services/event/events/http401/InvalidCredentialsEvent';
import {TranslateService} from '@ngx-translate/core';
import {stringFormat} from '../../extensions/string.extensions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  tenantSelectionEnabled = environment.authMultiTenancyEnabled && !environment.authRegistrationEnabled;
  registrationEnabled = environment.authRegistrationEnabled;

  formMode = 'login';

  showPassword = false;
  realm = '';
  email = '';
  username = '';
  password = '';
  passwordRepeat = '';

  constructor(private logger: LogService,
              private router: Router,
              private crossUI: CrossUiEventService,
              private snackBar: MatSnackBar,
              public authService: AuthService,
              private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.crossUI.usernameNotFound
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: LoginUsernameNotFoundEvent) => {
        this.translate.get('LOGIN.USERNAME_DOES_NOT_EXIST', {value: 'world'}).subscribe((res: string) => {
          this.snackBar.open(res, '', {duration: 5000});
        });
      });

    this.crossUI.realmNotFound
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: LoginRealmNotFoundEvent) => {
        this.translate.get('LOGIN.REALM_DOES_NOT_EXIST', {value: 'world'}).subscribe((res: string) => {
          this.snackBar.open(res, '', {duration: 5000});
        });
      });

    this.crossUI.usernameInvalid
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: UsernameInvalidEvent) => {
        this.translate.get('LOGIN.ERROR.USERNAME_INVALID', {value: 'world'}).subscribe((res: string) => {
          this.snackBar.open(res, '', {duration: 5000});
        });
      });

    this.crossUI.invalidCredentials
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((invalidCredentialsEvent: InvalidCredentialsEvent) => {
        this.translate.get('LOGIN.ERROR.INVALID_CREDENTIALS', {value: 'world'}).subscribe((res: string) => {
          this.snackBar.open(stringFormat(res, String(invalidCredentialsEvent.remainingLoginAttempts)), '', {duration: 5000});
        });
      });

    this.crossUI.remoteIpBlocked
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.translate.get('LOGIN.ERROR.IP_BLOCKED', {value: 'world'}).subscribe((res: string) => {
          this.snackBar.open(res, '', {duration: 5000});
        });
      });

    // User registration.
    this.crossUI.registerUsernameAlreadyExists
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.translate.get('LOGIN.ERROR.USERNAME_ALREADY_EXISTS', {value: 'world'}).subscribe((res: string) => {
          this.snackBar.open(res, '', {duration: 5000});
        });
      });

    this.crossUI.registerEmailAlreadyExists
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.translate.get('LOGIN.ERROR.EMAIL_ALREADY_EXISTS', {value: 'world'}).subscribe((res: string) => {
          this.snackBar.open(res, '', {duration: 5000});
        });
      });

    this.crossUI.emailInvalid
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.translate.get('LOGIN.ERROR.EMAIL_INVALID', {value: 'world'}).subscribe((res: string) => {
          this.snackBar.open(res, '', {duration: 5000});
        });
      });

    if (environment.developing) {
      this.realm = 'evatool-realm';
      this.username = 'admin';
      this.email = 'test@test.test';
      this.password = 'admin';
      this.passwordRepeat = 'admin';
    }

    if (!this.tenantSelectionEnabled) {
      this.realm = 'evatool-realm';
    }
  }

  ngAfterViewInit(): void {
    if (!environment.authEnabled) {
      this.translate.get('LOGIN.ERROR.AUTH_DISABLED', {value: 'world'}).subscribe((res: string) => {
        this.snackBar.open(res, '', {duration: 5000});
      });
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  termsAndConditions(): void {
    this.router.navigate([ROUTES.termsAndConditions]);
  }

  forgotPassword(): void {
    this.router.navigate([ROUTES.forgotPassword]);
  }

  onSubmit(): void {
    if (this.formMode === 'login') {
      if (this.realm === '') {
        this.translate.get('LOGIN.ERROR.EMPTY_REALM', {value: 'world'}).subscribe((res: string) => {
          this.snackBar.open(res, '', {duration: 5000});
        });
      } else if (this.username === '') {
        this.translate.get('LOGIN.ERROR.USERNAME_EMPTY', {value: 'world'}).subscribe((res: string) => {
          this.snackBar.open(stringFormat(res), '', {duration: 5000});
        });
      } else if (this.password === '') {
        this.translate.get('LOGIN.ERROR.PASSWORD_EMPTY', {value: 'world'}).subscribe((res: string) => {
          this.snackBar.open(res, '', {duration: 5000});
        });
      } else { // Inputs valid.
        if (this.registrationEnabled) {
          this.authService.login('evatool-realm', this.username, this.password);
        } else {
          this.authService.login(this.realm, this.username, this.password);
        }
      }
    } else {
      if (this.username === '') {
        this.translate.get('LOGIN.ERROR.USERNAME_EMPTY', {value: 'world'}).subscribe((res: string) => {
          this.snackBar.open(res, '', {duration: 5000});
        });
      } else if (this.email === '') {
        this.translate.get('LOGIN.ERROR.EMAIL_EMPTY', {value: 'world'}).subscribe((res: string) => {
          this.snackBar.open(res, '', {duration: 5000});
        });
      } else if (this.password === '') {
        this.translate.get('LOGIN.ERROR.PASSWORD_EMPTY', {value: 'world'}).subscribe((res: string) => {
          this.snackBar.open(res, '', {duration: 5000});
        });
      } else if (this.password !== this.passwordRepeat) {
        this.translate.get('LOGIN.ERROR.PASSWORDS_NOT_MATCHING', {value: 'world'}).subscribe((res: string) => {
          this.snackBar.open(res, '', {duration: 5000});
        });
      } else {
        this.authService.registerUser(this.username, this.email, this.password);
      }
    }
  }
}
