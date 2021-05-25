import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

export class SpecService {

  public static readonly imports = [
    HttpClientModule,
    RouterTestingModule
  ];

  public static readonly providers = [
    HttpClientModule,
    RouterTestingModule
  ];

}
