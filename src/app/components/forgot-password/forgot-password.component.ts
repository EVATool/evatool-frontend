import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  // TODO Enable/Disable based on registrationEnabled env var?

  constructor() {
  }

  ngOnInit(): void {
  }

}
