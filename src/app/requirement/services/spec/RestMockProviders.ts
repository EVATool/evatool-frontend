import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {RequirementsRestService} from '../requirements/requirements-rest.service';
import {MockedRequirementsRestService} from '../requirements/requirements-rest.service.spec';
import {VariantsRestService} from '../variants/variants-rest.service';

export class RestMockProvidersRequirements{
  public static readonly imports: any[] = [
    HttpClientTestingModule,
    RouterTestingModule,
  ];

  public static readonly providers: any[] = [
    {
      provide: RequirementsRestService,
      useClass: MockedRequirementsRestService
    },
    {
      provide: VariantsRestService,
    }
  ];
}
