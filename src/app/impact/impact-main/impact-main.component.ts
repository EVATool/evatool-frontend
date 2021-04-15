import {ImpactTableFilterBarComponent} from '../components/impact-table-filter-bar/impact-table-filter-bar.component';
import {ImpactTableFilterEvent} from '../components/impact-table-filter-bar/ImpactTableFilterEvent';
import {ImpactTableComponent} from '../components/impact-table/impact-table.component';
import {LogService} from '../../shared/services/log.service';
import {Impact} from '../models/Impact';
import {ImpactDataService} from '../services/impact/impact-data.service';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ValueDataService} from "../services/value/value-data.service";
import {StakeholderDataService} from "../services/stakeholder/stakeholder-data.service";
import {AnalysisDataService} from "../services/analysis/analysis-data.service";

@Component({
  selector: 'app-impact-main',
  templateUrl: './impact-main.component.html',
  styleUrls: ['./impact-main.component.scss']
})
export class ImpactMainComponent implements OnInit, AfterViewInit {
  @ViewChild(ImpactTableComponent) table!: ImpactTableComponent;
  @ViewChild(ImpactTableFilterBarComponent) filterBar!: ImpactTableFilterBarComponent;

  constructor(
    private logger: LogService,
    public impactDataService: ImpactDataService,
    private valueDataService: ValueDataService,
    private stakeholderDataService: StakeholderDataService,
    private analysisDataService: AnalysisDataService
  ) {
  }

  ngOnInit(): void {
    this.impactDataService.addedImpact.subscribe((impact: Impact) => {
      this.logger.info(this, 'Event \'addedImpact\' received from ImpactDataService');
      this.filterBar.clearFilter();
      this.table.clearSort();
    });
  }

  ngAfterViewInit(): void {
    this.table?.reload();
  }

  filterBarChanged(event: ImpactTableFilterEvent) {
    this.logger.info(this, 'Filter Bar Changed');
    this.table.filterChange(event);
  }

  tabActivated() {
    this.logger.info(this, 'Tab activated');
    //this.stakeholderDataService.onInit();
  }
}
