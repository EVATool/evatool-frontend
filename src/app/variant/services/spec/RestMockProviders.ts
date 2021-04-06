import {VariantRestService} from '../variant-rest.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MockedVariantRestService} from '../variant-rest.service.spec';


export class RestMockProvidersVariants {
  public static readonly imports: any[] = [
    HttpClientTestingModule,
    RouterTestingModule,
  ];

  public static readonly providers: any[] = [
    {
      provide: VariantRestService,
      useClass: MockedVariantRestService
    }
  ];
}
