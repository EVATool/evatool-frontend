import {Injectable} from '@angular/core';
import {AnalysisDataService} from './data/analysis-data.service';
import {StakeholderDataService} from './data/stakeholder-data.service';
import {ValueDataService} from './data/value-data.service';
import {RequirementDataService} from './data/requirement-data.service';
import {ImpactDataService} from './data/impact-data.service';
import {RequirementDeltaDataService} from './data/requirement-delta-data.service';
import {VariantDataService} from './data/variant-data.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private analysisData: AnalysisDataService,
              private stakeholderData: StakeholderDataService,
              private valueData: ValueDataService,
              private requirementData: RequirementDataService,
              private impactData: ImpactDataService,
              private requirementDeltaData: RequirementDeltaDataService,
              private variantData: VariantDataService) {
  }

  init(): void {
    this.requirementDeltaData.init();
    this.requirementData.init();
    this.impactData.init();
    this.variantData.init();
    this.valueData.init();
    this.stakeholderData.init();
    this.analysisData.init();
  }
}
