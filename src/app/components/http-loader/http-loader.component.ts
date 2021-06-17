import {Component, OnInit} from '@angular/core';
import {LogService} from '../../services/log.service';
import {HttpLoaderService} from '../../services/http-loader.service';

@Component({
  selector: 'app-http-loader',
  templateUrl: './http-loader.component.html',
  styleUrls: ['./http-loader.component.scss']
})
export class HttpLoaderComponent implements OnInit {

  loading = false;

  constructor(private logger: LogService,
              private httpLoaderService: HttpLoaderService) {
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
  }
}
