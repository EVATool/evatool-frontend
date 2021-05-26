import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormBuilder} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';

export class SpecService {

  public static readonly imports: any[] = [
    HttpClientModule,
    RouterTestingModule,
    MatDialogModule,
    MatSnackBarModule,
  ];

  public static readonly providers: any[] = [
    HttpClientModule,
    RouterTestingModule,
    MatDialogModule,
    MatSnackBarModule,
    FormBuilder,
    MatMenuModule
  ];

}
