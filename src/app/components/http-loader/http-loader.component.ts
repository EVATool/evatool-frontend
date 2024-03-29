import {Component, OnDestroy, OnInit} from '@angular/core';
import {LogService} from '../../services/log.service';
import {HttpLoaderService} from '../../services/http-loader.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpInfo, HttpInfoType} from '../../services/HttpInfo';
import {CrossUiEventService} from '../../services/cross-ui-event.service';
import {Router} from '@angular/router';
import {ROUTES} from '../../app-routes';
import {environment} from '../../../environments/environment';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-http-loader',
  templateUrl: './http-loader.component.html',
  styleUrls: ['./http-loader.component.scss']
})
export class HttpLoaderComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

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
    this.httpLoaderService.httpActive
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.logger.debug(this, 'There are active http requests');
        this.successIconShown = false;
        this.loadingSpinnerShown = true;
      });

    this.httpLoaderService.httpNotActive
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((lastHttpEvent: HttpInfo) => {
        this.logger.debug(this, 'There are NO active http requests');
        this.loadingSpinnerShown = false;

        if (lastHttpEvent.type === HttpInfoType.Complete) {
          this.successIconShown = true;

          setTimeout(() => {
            this.successIconShown = false;
          }, 1000);
        }
      });

    this.crossUI.authenticationFailed
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => { // 401
        if (!this.router.url.includes(ROUTES.realmAdministration)) {
          this.router.navigate([ROUTES.login]);
        }
      });

    this.crossUI.authorizationFailed
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => { // 403
        this.router.navigate([ROUTES.accessDenied]);
      });

    // Generic http error display.
    this.httpLoaderService.httpError
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((httpInfo: HttpInfo) => {
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
          snackBarRef.afterDismissed()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
              this.snackBarShown = false;
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
