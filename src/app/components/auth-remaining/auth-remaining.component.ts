import {Component, isDevMode, OnInit} from '@angular/core';
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

  getRemainingTokenTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time - 60 * minutes;
    return this.padLeft(minutes, 2, '0') + ':' + this.padLeft(seconds, 2, '0');
  }

  padLeft(value: any, amount: number, symbol: string): string {
    return (value + '').padStart(amount, symbol);
  }
}
