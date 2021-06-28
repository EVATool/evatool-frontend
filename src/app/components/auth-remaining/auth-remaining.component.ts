import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {LogService} from '../../services/log.service';

@Component({
  selector: 'app-auth-remaining',
  templateUrl: './auth-remaining.component.html',
  styleUrls: ['./auth-remaining.component.scss']
})
export class AuthRemainingComponent implements OnInit {

  constructor(private logger: LogService,
              public authService: AuthService) {
  }

  ngOnInit(): void {
  }

  refreshToken(): void {
    this.authService.refreshExistingToken();
  }

  getRemainingTokenTime(): string {
    const minutes = Math.floor(this.authService.tokenExpiresIn / 60);
    const seconds = this.authService.tokenExpiresIn - 60 * minutes;
    return minutes + ':' + (seconds + '').padStart(2, '0');
  }
}
