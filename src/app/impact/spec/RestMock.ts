import {ValueRestService} from '../services/value/value-rest.service';
import {MockedValueRestService} from '../services/value/value-rest.service.spec';
import {StakeholderRestService} from '../services/stakeholder/stakeholder-rest.service';
import {MockedStakeholderRestService} from '../services/stakeholder/stakeholder-rest.service.spec';
import {AnalysisRestService} from '../services/analysis/analysis-rest.service';
import {MockedAnalysisRestService} from '../services/analysis/analysis-rest.service.spec';
import {ImpactRestService} from '../services/impact/impact-rest.service';
import {MockedImpactRestService} from '../services/impact/impact-rest.service.spec';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

export class RestMock {
  public static readonly imports: any[] = [
    HttpClientTestingModule,
    RouterTestingModule
  ];

  public static readonly providers: any[] = [
    {
      provide: ValueRestService,
      useClass: MockedValueRestService
    },
    {
      provide: StakeholderRestService,
      useClass: MockedStakeholderRestService
    },
    {
      provide: AnalysisRestService,
      useClass: MockedAnalysisRestService
    },
    {
      provide: ImpactRestService,
      useClass: MockedImpactRestService
    }
  ];
}
