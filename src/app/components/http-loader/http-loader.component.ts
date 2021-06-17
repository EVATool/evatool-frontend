import {Component, OnInit} from '@angular/core';
import {LogService} from '../../services/log.service';
import {HttpLoaderService} from '../../services/http-loader.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpEvent, HttpEventType} from '../../services/HttpEvent';

@Component({
  selector: 'app-http-loader',
  templateUrl: './http-loader.component.html',
  styleUrls: ['./http-loader.component.scss']
})
export class HttpLoaderComponent implements OnInit {

  loadingSpinnerShown = false;
  snackBarCurrentlyShown = false;
  successIconShown = false;

  constructor(private logger: LogService,
              private httpLoaderService: HttpLoaderService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.httpLoaderService.httpActive.subscribe(() => {
      this.logger.debug(this, 'There are active http requests');
      this.successIconShown = false;
      this.loadingSpinnerShown = true;
    });

    this.httpLoaderService.httpNotActive.subscribe((lastHttpEvent: HttpEvent) => {
      this.logger.debug(this, 'There are NO active http requests');
      this.loadingSpinnerShown = false;

      if (lastHttpEvent.type === HttpEventType.Complete) {
        this.successIconShown = true;

        const interval = setTimeout(() => {
          this.successIconShown = false;
        }, 1000);
      }
    });

    this.httpLoaderService.httpError.subscribe((httpEvent: HttpEvent) => {
      if (!this.snackBarCurrentlyShown) {
        this.snackBarCurrentlyShown = true;
        const message = 'An http request failed';
        const action = '';
        const snackBarRef = this.snackBar.open(message, action, {duration: 5000});
        snackBarRef.afterDismissed().subscribe(() => {
          console.log('closing http error snackbar...');
          this.snackBarCurrentlyShown = false;
        });
      }
    });
  }
}
