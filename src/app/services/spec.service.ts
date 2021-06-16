import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormBuilder} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
  DEFAULT_LANGUAGE,
  MissingTranslationHandler,
  TranslateCompiler,
  TranslateLoader, TranslateModule,
  TranslateParser,
  TranslateService,
  TranslateStore, USE_DEFAULT_LANG, USE_EXTEND, USE_STORE
} from '@ngx-translate/core';
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
