import {Component, OnInit} from '@angular/core';
import {LogService} from '../../services/log.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ROUTES} from '../../app-routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private logger: LogService,
              private router: Router,
              public authService: AuthService) {
  }

  ngOnInit(): void {
  }

  termsAndConditions(): void {
    this.router.navigate([ROUTES.termsAndConditions]);
  }

  forgotPassword(): void {
    this.router.navigate([ROUTES.forgotPassword]);
  }
}
