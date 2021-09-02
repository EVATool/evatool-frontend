import {Component, ViewChild} from '@angular/core';
import {LogService} from '../../services/log.service';
import {ImpactDataService} from '../../services/data/impact-data.service';
import {ValueDataService} from '../../services/data/value-data.service';
import {StakeholderDataService} from '../../services/data/stakeholder-data.service';
import {AnalysisDataService} from '../../services/data/analysis-data.service';
import {ImpactTableComponent} from '../impact-table/impact-table.component';
import {ImpactFilterBarComponent} from '../impact-filter-bar/impact-filter-bar.component';

@Component({
  selector: 'app-impact-edit',
  templateUrl: './impact-edit.component.html',
  styleUrls: ['./impact-edit.component.scss']
})
export class ImpactEditComponent {
  @ViewChild(ImpactTableComponent) table!: ImpactTableComponent;
  @ViewChild(ImpactFilterBarComponent) filterBar!: ImpactFilterBarComponent;

  constructor(
    private logger: LogService,
    public impactDataService: ImpactDataService,
    private valueDataService: ValueDataService,
    private stakeholderDataService: StakeholderDataService,
    private analysisDataService: AnalysisDataService) {
  }

  tabActivated() {
    this.logger.debug(this, 'Tab activated');
    //this.table?.reload();
  }
}
