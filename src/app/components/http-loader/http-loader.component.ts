import {Component, OnInit} from '@angular/core';
import {LogService} from '../../services/log.service';
import {HttpLoaderService} from '../../services/http-loader.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpEvent} from '../../services/HttpEvent';

@Component({
  selector: 'app-http-loader',
  templateUrl: './http-loader.component.html',
  styleUrls: ['./http-loader.component.scss']
})
export class HttpLoaderComponent implements OnInit {

  loading = false;
  snackBarCurrentlyShown = false;

  constructor(private logger: LogService,
              private httpLoaderService: HttpLoaderService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.httpLoaderService.httpActive.subscribe(() => {
      this.logger.debug(this, 'There are active http requests');
      this.loading = true;
    });

    this.httpLoaderService.httpNotActive.subscribe(() => {
      this.logger.debug(this, 'There are NO active http requests');
      this.loading = false;
    });

    this.httpLoaderService.httpComplete.subscribe((httpEvent: HttpEvent) => {

    });

    this.httpLoaderService.httpError.subscribe((httpEvent: HttpEvent) => {
      if (!this.snackBarCurrentlyShown) {
        this.snackBarCurrentlyShown = true;
        const message = 'An http request failed :c';
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
