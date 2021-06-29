import {Component, isDevMode, OnInit} from '@angular/core';
import {LogService} from '../../services/log.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ROUTES} from '../../app-routes';
import {CrossUiEventService} from '../../services/cross-ui-event.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showPassword = false;

  constructor(private logger: LogService,
              private router: Router,
              private crossUI: CrossUiEventService,
              private snackBar: MatSnackBar,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    this.crossUI.authenticationFailed.subscribe(() => {
      const message = 'Invalid credentials';
      const action = '';
      const snackBarRef = this.snackBar.open(message, action, {duration: 5000});
    });

    if (isDevMode()) {
      this.authService.username = 'admin';
      this.authService.password = 'admin';
    }
  }

  termsAndConditions(): void {
    this.router.navigate([ROUTES.termsAndConditions]);
  }

  forgotPassword(): void {
    this.router.navigate([ROUTES.forgotPassword]);
  }

  onSubmit(): void {
    this.authService.getInitialToken();
  }
}
