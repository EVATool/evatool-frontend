import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {StakeholderDataService} from "../../../../services/data/stakeholder-data.service";
import {Stakeholder} from "../../../../model/Stakeholder";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {AnalysisDataService} from "../../../../services/data/analysis-data.service";
import {StakeholderTableFilterEvent} from "../stakeholders-filter-bar/StakeholderTableFilterEvent";
import {LogService} from "../../../../services/log.service";
import {Impact} from "../../../../model/Impact";
import {NgScrollbar} from "ngx-scrollbar";
import {MatSort} from "@angular/material/sort";
import {SliderFilterBoundary, SliderFilterType} from "../../../impact-slider/SliderFilterSettings";

@Component({
  selector: 'app-stakeholders-table',
  templateUrl: './stakeholders-table.component.html',
  styleUrls: ['./stakeholders-table.component.scss']
})
export class StakeholdersTableComponent implements OnInit, AfterViewInit {
  @ViewChild(NgScrollbar) scrollbarRef!: NgScrollbar;
  @ViewChild(MatTable) table!: MatTable<Stakeholder>;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  displayedColumns = ['prefixSequenceId', 'name', 'level', 'priority', 'impacted'];
  tableDataSource = new MatTableDataSource<Stakeholder>();
  windowScrolled = false;
  highlightFilter = '';

  constructor(private logger: LogService,
              public stakeholderData: StakeholderDataService,
              private analysisData: AnalysisDataService) {
  }

  ngOnInit(): void {
    this.stakeholderData.loadedStakeholders.subscribe((stakeholders: Stakeholder[]) => {
      this.updateTableDataSource();
    });

    this.stakeholderData.createdStakeholder.subscribe((stakeholders: Stakeholder) => {
      this.updateTableDataSource();
      //const options = {bottom: -100, duration: 250};
      //this.scrollbarRef.scrollTo(options);
      // Flash newly created impact.
    });

    this.stakeholderData.deletedStakeholder.subscribe((stakeholders: Stakeholder) => {
      this.updateTableDataSource();
    });

    this.updateTableDataSource();
  }

  ngAfterViewInit(): void {
    this.scrollbarRef.scrolled.subscribe(e => {
      this.windowScrolled = e.target.scrollTop !== 0;
    });

    this.initSorting();
    this.initFiltering();
  }

  updateTableDataSource(): void {
    this.tableDataSource.data = this.stakeholderData.stakeholders;
  }

  scrollToTop(): void {
    this.logger.info(this, 'Scroll To Top');
    const options = {top: 0, duration: 250};
    this.scrollbarRef.scrollTo(options);
  }

  initSorting(): void {
    this.logger.info(this, 'Init Sorting');
    this.tableDataSource.sort = this.sort;
    this.tableDataSource.sortingDataAccessor = (stakeholder, property) => {
      switch (property) {
        default:
          return stakeholder[property];
      }
    };
  }

  initFiltering(): void {
    this.logger.info(this, 'Init Filtering');
    this.tableDataSource.filterPredicate = this.createFilterPredicate();
  }

  createFilterPredicate(): (data: any, filter: string) => boolean {
    return (data: Stakeholder, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      const levelFilter = searchTerms.level.length === 0 || searchTerms.level.indexOf(data.level) !== -1;

      const priorityFilter = searchTerms.priority.length === 0 || searchTerms.priority == data.priority; //searchTerms.priority.indexOf(data.priority) !== -1;

      var impactedFilter = searchTerms.impacted === 0 || (data.impacted != null && data.impacted <= searchTerms.impacted);

      return levelFilter && priorityFilter && impactedFilter;
    };
  }

  createStakeholder(): void {
    this.stakeholderData.createStakeholder(this.stakeholderData.createDefaultStakeholder(this.analysisData.currentAnalysis));
  }

  updateStakeholder(stakeholder: Stakeholder): void {
    this.stakeholderData.updateStakeholder(stakeholder);
  }

  deleteStakeholder(stakeholder: Stakeholder): void {
    this.stakeholderData.deleteStakeholder(stakeholder);
  }

  updateFilter(event: StakeholderTableFilterEvent): void {
    this.logger.info(this, 'Filter Changed');
    this.highlightFilter = event.highlight;
    this.tableDataSource.filter = JSON.stringify(event);
  }
}
