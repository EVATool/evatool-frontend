import {Component, OnInit, ViewChild} from '@angular/core';
import {LogService} from '../../../services/log.service';
import {ImpactDataService} from '../../../services/data/impact-data.service';
import {ValueDataService} from '../../../services/data/value-data.service';
import {StakeholderDataService} from '../../../services/data/stakeholder-data.service';
import {AnalysisDataService} from '../../../services/data/analysis-data.service';
import {ImpactsTableComponent} from './impacts-table/impacts-table.component';
import {ImpactsFilterBarComponent} from './impacts-filter-bar/impacts-filter-bar.component';

@Component({
  selector: 'app-impacts',
  templateUrl: './impacts.component.html',
  styleUrls: ['./impacts.component.scss']
})
export class ImpactsComponent implements OnInit {
  @ViewChild(ImpactsTableComponent) table!: ImpactsTableComponent;
  @ViewChild(ImpactsFilterBarComponent) filterBar!: ImpactsFilterBarComponent;

  constructor(
    private logger: LogService,
    public impactDataService: ImpactDataService,
    private valueDataService: ValueDataService,
    private stakeholderDataService: StakeholderDataService,
    private analysisDataService: AnalysisDataService) {

  }

  ngOnInit(): void {
    // this.impactDataService.createdImpact.subscribe((impact: Impact) => {
    //   this.logger.info(this, 'Event \'addedImpact\' received from ImpactDataService');
    //   this.filterBar.clearFilter();
    //   this.table.clearSort();
    // });
  }

  ngAfterViewInit(): void {

  }

  tabActivated() {
    this.logger.info(this, 'Tab activated');
    //this.table?.reload(); // TODO...?
  }
}
