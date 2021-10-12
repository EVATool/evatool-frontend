import {Component, OnInit} from '@angular/core';
import {LogService} from '../../services/log.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
/*
Two modes:
  1. User is logged in, save settings to backend (this feature comes later)
  2. User is not logged in, save settings in local storage.
*/
export class UserSettingsComponent implements OnInit {

  constructor(private logger: LogService) {
  }

  ngOnInit(): void {
  }
}
