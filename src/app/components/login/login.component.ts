import {AfterViewInit, Component, isDevMode, OnInit} from '@angular/core';
import {LogService} from '../../services/log.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ROUTES} from '../../app-routes';
import {CrossUiEventService, RealmNotFoundEvent} from '../../services/cross-ui-event.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {environment} from '../../../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  // TODO add buttons to go from login to registration and vice versa

  tenantSelectionEnabled = environment.authMultiTenancyEnabled;
  registrationEnabled = environment.authRegistrationEnabled;

  formMode = 'login';

  showPassword = false;
  tenant = '';
  email = '';
  username = '';
  password = '';
  passwordRepeat = '';

  constructor(private logger: LogService,
              private router: Router,
              private crossUI: CrossUiEventService,
              private snackBar: MatSnackBar,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    this.crossUI.authenticationFailed.subscribe(() => {
      const message = 'Invalid credentials';
      this.snackBar.open(message, '', {duration: 5000});
    });

    this.crossUI.realmNotFound.subscribe((event: RealmNotFoundEvent) => {
      // TODO consider using the same message as in the authenticationFailed method to prohibit checking for which tenants exist.
      const message = 'Tenant ' + event.realm + ' does not exist';
      this.snackBar.open(message, '', {duration: 5000});
    });

    if (isDevMode()) {
      this.tenant = 'evatool-realm';
      this.username = 'admin';
      this.email = 'test@test.test';
      this.password = 'admin';
      this.passwordRepeat = 'admin';
    }

    if (!this.tenantSelectionEnabled) {
      this.tenant = 'evatool-realm';
    }
  }

  ngAfterViewInit(): void {
    if (!environment.authEnabled && !environment.testing) {
      const message = 'Authentication is disabled. You will not be able to login.';
      this.snackBar.open(message, '', {duration: 5000});
    }
  }

  termsAndConditions(): void {
    this.router.navigate([ROUTES.termsAndConditions]);
  }

  forgotPassword(): void {
    this.router.navigate([ROUTES.forgotPassword]);
  }

  onSubmit(): void {
    if (this.tenant === '') {
      this.snackBar.open('Please enter a tenant', '', {duration: 5000});
    } else if (this.username === '') {
      this.snackBar.open('Please enter a username', '', {duration: 5000});
    } else if (this.password === '') {
      this.snackBar.open('Please enter a password', '', {duration: 5000});
    } else {
      this.authService.login(this.tenant, this.username, this.password);
    }
  }
}
