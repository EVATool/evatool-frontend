import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AnalysisRestService} from '../analysis/analysis-rest.service';
import {MockedAnalysisRestService} from '../analysis/analysis-rest.service.spec';

export class RestMockProvidersAnalysis {
  public static readonly imports: any[] = [
    HttpClientTestingModule,
    RouterTestingModule,
  ];

  public static readonly providers: any[] = [
    {
      provide: AnalysisRestService,
      useClass: MockedAnalysisRestService
    }
  ];
}
