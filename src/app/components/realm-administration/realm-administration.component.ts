import {AfterViewInit, Component, isDevMode, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {LogService} from '../../services/log.service';
import {Router} from '@angular/router';
import {CrossUiEventService, RealmNotFoundEvent} from '../../services/cross-ui-event.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-realm-administration',
  templateUrl: './realm-administration.component.html',
  styleUrls: ['./realm-administration.component.scss']
})
export class RealmAdministrationComponent implements OnInit, AfterViewInit {

  realm = '';
  email = '';
  username = '';
  password = '';
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
      this.snackBar.open(message, '', {duration: 5000});
    });

    this.authService.realmRegistered.subscribe((realm: string) => {
      const message = 'Realm "' + realm + '" was successfully created.';
      const action = 'Manage';
      this.snackBar.open(message, action, {duration: 5000}).onAction().subscribe(() => {
        const realmManageUrl = this.authService.getAuthManageRealmUrl(realm);
        window.open(realmManageUrl);
      });
    });

    if (isDevMode()) {
      this.realm = 'new-realm';
    }
  }

  ngAfterViewInit(): void {
    console.log('fasdbhsdfajkbln');
    if (!environment.authEnabled && !environment.testing) {
      const message = 'Authentication is disabled in this deployment.';
      this.snackBar.open(message, '', {duration: 5000});
    } else if (environment.authRegistrationEnabled) {
      const message = 'User registration is enabled in this deployment. Nobody will be able to log into created realms.';
      this.snackBar.open(message, '', {duration: 5000});
    }
  }

  onSubmit(): void {
    if (this.realm === '') {
      this.snackBar.open('Please enter a realm', '', {duration: 5000});
      return;
    }

    this.authService.registerRealm(this.username, this.password, this.realm);
  }
}
