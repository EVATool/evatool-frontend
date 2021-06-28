import {Component, OnInit} from '@angular/core';
import {LogService} from '../../services/log.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private logger: LogService,
              public authService: AuthService) {
  }

  ngOnInit(): void {
  }

}
