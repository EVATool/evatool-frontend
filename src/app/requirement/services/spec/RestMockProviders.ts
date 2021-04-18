import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {RequirementsRestService} from '../requirements/requirements-rest.service';
import {MockedRequirementsRestService} from '../requirements/requirements-rest.service.spec';

export class RestMockProvidersRequirements{
  public static readonly imports: any[] = [
    HttpClientTestingModule,
    RouterTestingModule,
  ];

  public static readonly providers: any[] = [
    {
      provide: RequirementsRestService,
      useClass: MockedRequirementsRestService
    }
  ];
}
