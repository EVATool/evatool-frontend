import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ValueRestService} from '../value/value-rest.service';
import {MockedValueRestService} from '../value/value-rest.service.spec';

export class RestMockProvidersValues {
  public static readonly imports: any[] = [
    HttpClientTestingModule,
    RouterTestingModule,
  ];

  public static readonly providers: any[] = [
    {
      provide: ValueRestService,
      useClass: MockedValueRestService
    }
  ];
}
