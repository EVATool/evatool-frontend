import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {StakeholderRestService} from '../stakeholder-rest.service';
import {MockedStakeholderRestService} from '../stakeholder-rest.service.spec';

export class RestMockProvidersStakeholder {
  public static readonly imports: any[] = [
    HttpClientTestingModule,
    RouterTestingModule,
  ];

  public static readonly providers: any[] = [
    {
      provide: StakeholderRestService,
      useClass: MockedStakeholderRestService
    }
  ];
}
