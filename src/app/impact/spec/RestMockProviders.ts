import {DimensionRestService} from "../services/dimension/dimension-rest.service";
import {MockedValueRestService} from "../services/dimension/dimension-rest.service.spec";
import {StakeholderRestService} from "../services/stakeholder/stakeholder-rest.service";
import {MockedStakeholderRestService} from "../services/stakeholder/stakeholder-rest.service.spec";
import {AnalysisRestService} from "../services/analysis/analysis-rest.service";
import {MockedAnalysisRestService} from "../services/analysis/analysis-rest.service.spec";
import {ImpactRestService} from "../services/impact/impact-rest.service";
import {MockedImpactRestService} from "../services/impact/impact-rest.service.spec";

export class RestMockProviders {
  public static readonly providers = [
    {
      provide: DimensionRestService,
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
  ]
}
