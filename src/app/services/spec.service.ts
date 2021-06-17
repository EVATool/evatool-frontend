import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormBuilder} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../app.module';

export class SpecService {

  public static readonly imports: any[] = [
    HttpClientModule,
    HttpClientTestingModule,
    RouterTestingModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ];

  public static readonly providers: any[] = [
    HttpClientModule,
    RouterTestingModule,
    MatDialogModule,
    MatSnackBarModule,
    FormBuilder,
    MatMenuModule,
    TranslateService,
  ];
}
