import {Component, OnDestroy, OnInit} from '@angular/core';
import {LogService} from '../../services/log.service';
import {HttpMarshallService} from '../../services/http/http-marshall.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpInfo, HttpInfoType} from '../../services/http/HttpInfo';
import {CrossUiEventService} from '../../services/event/cross-ui-event.service';
import {Router} from '@angular/router';
import {ROUTES} from '../../app-routes';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

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
              private httpMarshall: HttpMarshallService,
              private crossUI: CrossUiEventService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.httpMarshall.httpActive
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.logger.debug(this, 'There are active http requests');
        this.successIconShown = false;
        this.loadingSpinnerShown = true;
      });

    this.httpMarshall.httpNotActive
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

    this.crossUI.crossRealmAccess // Special case of authorization failed (functional error case).
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => { // 403
        this.router.navigate([ROUTES.accessDenied]);
      });

    // Generic http error display.
    this.httpMarshall.httpError // TODO Instead of handling "httpMarshall.httpError", an event from crossUIEventService should be handled that means an unexpected error occured.
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((httpInfo: HttpInfo) => {
        console.log(httpInfo); // This should stay here.

        if (!environment.production
          && httpInfo.httpStatusCode !== 404
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
