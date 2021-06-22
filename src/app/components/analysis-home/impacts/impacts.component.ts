import {Component, ViewChild} from '@angular/core';
import {LogService} from '../../../services/log.service';
import {ImpactDataService} from '../../../services/data/impact-data.service';
import {ValueDataService} from '../../../services/data/value-data.service';
import {StakeholderDataService} from '../../../services/data/stakeholder-data.service';
import {AnalysisDataService} from '../../../services/data/analysis-data.service';
import {ImpactsTableComponent} from './impacts-table/impacts-table.component';
import {ImpactsFilterBarComponent} from './impacts-filter-bar/impacts-filter-bar.component';
import {Stakeholder} from '../../../model/Stakeholder';

@Component({
  selector: 'app-impacts',
  templateUrl: './impacts.component.html',
  styleUrls: ['./impacts.component.scss']
})
export class ImpactsComponent {
  @ViewChild(ImpactsTableComponent) table!: ImpactsTableComponent;
  @ViewChild(ImpactsFilterBarComponent) filterBar!: ImpactsFilterBarComponent;

  constructor(
    private logger: LogService,
    public impactDataService: ImpactDataService,
    private valueDataService: ValueDataService,
    private stakeholderDataService: StakeholderDataService,
    private analysisDataService: AnalysisDataService) {
  }

  tabActivated() {
    this.logger.info(this, 'Tab activated');
    //this.table?.reload();
  }
}
