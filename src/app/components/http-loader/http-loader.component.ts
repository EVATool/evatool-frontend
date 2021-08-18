import {Component, OnInit} from '@angular/core';
import {LogService} from '../../services/log.service';
import {HttpLoaderService} from '../../services/http-loader.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpInfo, HttpInfoType} from '../../services/HttpInfo';
import {CrossUiEventService} from '../../services/cross-ui-event.service';
import {Router} from '@angular/router';
import {ROUTES} from '../../app-routes';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-http-loader',
  templateUrl: './http-loader.component.html',
  styleUrls: ['./http-loader.component.scss']
})
export class HttpLoaderComponent implements OnInit {

  loadingSpinnerShown = false;
  snackBarShown = false;
  successIconShown = false;

  constructor(private logger: LogService,
              private httpLoaderService: HttpLoaderService,
              private crossUI: CrossUiEventService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.httpLoaderService.httpActive.subscribe(() => {
      this.logger.debug(this, 'There are active http requests');
      this.successIconShown = false;
      this.loadingSpinnerShown = true;
    });

    this.httpLoaderService.httpNotActive.subscribe((lastHttpEvent: HttpInfo) => {
      this.logger.debug(this, 'There are NO active http requests');
      this.loadingSpinnerShown = false;

      if (lastHttpEvent.type === HttpInfoType.Complete) {
        this.successIconShown = true;

        const interval = setTimeout(() => {
          this.successIconShown = false;
        }, 1000);
      }
    });

    this.crossUI.authenticationFailed.subscribe(() => { // 401
      if (!this.router.url.includes('/admin/')) {
        this.router.navigate([ROUTES.login]);
      }
    });

    this.crossUI.authorizationFailed.subscribe(() => { // 403
      this.router.navigate([ROUTES.accessDenied]);
    });

    // Generic http error display.
    this.httpLoaderService.httpError.subscribe((httpInfo: HttpInfo) => {
      if (!environment.production) {
        console.log(httpInfo); // This should stay here.
      }
      if (httpInfo.httpStatusCode !== 404
        && httpInfo.httpStatusCode !== 403
        && httpInfo.httpStatusCode !== 401
        && !httpInfo.functionalErrorCode
        && !this.snackBarShown) {

        this.snackBarShown = true;
        const message = 'An http request failed (status ' + httpInfo.httpStatusCode + ')';
        const action = '';
        const snackBarRef = this.snackBar.open(message, action, {duration: 5000});
        snackBarRef.afterDismissed().subscribe(() => {
          this.snackBarShown = false;
        });
      }
    });
  }
}
