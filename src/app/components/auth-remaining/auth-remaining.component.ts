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
}
