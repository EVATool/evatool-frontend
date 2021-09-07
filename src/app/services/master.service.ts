import {Injectable} from '@angular/core';
import {AnalysisDataService} from './data/analysis-data.service';
import {StakeholderDataService} from './data/stakeholder-data.service';
import {ValueDataService} from './data/value-data.service';
import {RequirementDataService} from './data/requirement-data.service';
import {ImpactDataService} from './data/impact-data.service';
import {RequirementDeltaDataService} from './data/requirement-delta-data.service';
import {VariantDataService} from './data/variant-data.service';
import {CrossUiEventService} from './event/cross-ui-event.service';
import {LogService} from './log.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private crossUI: CrossUiEventService,
              public analysisData: AnalysisDataService,
              public stakeholderData: StakeholderDataService,
              public valueData: ValueDataService,
              public requirementData: RequirementDataService,
              public impactData: ImpactDataService,
              public requirementDeltaData: RequirementDeltaDataService,
              public variantData: VariantDataService,
              private logger: LogService) {
  }

  init(): void {
    this.logger.trace(this, 'init');

    this.crossUI.init();

    this.requirementDeltaData.init();
    this.requirementData.init();
    this.impactData.init();
    this.variantData.init();
    this.valueData.init();
    this.stakeholderData.init();
    this.analysisData.init();

    this.crossUI.initComplete.emit();
    this.crossUI.initialized = true;
  }
}
