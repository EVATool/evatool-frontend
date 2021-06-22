import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {StakeholderDataService} from '../../services/data/stakeholder-data.service';
import {Stakeholder} from '../../model/Stakeholder';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {AnalysisDataService} from '../../services/data/analysis-data.service';
import {StakeholderTableFilterEvent} from '../stakeholder-filter-bar/StakeholderTableFilterEvent';
import {LogService} from '../../services/log.service';
import {NgScrollbar} from 'ngx-scrollbar';
import {MatSort} from '@angular/material/sort';
import {SliderFilterSettings} from '../impact-slider/SliderFilterSettings';
import {HttpLoaderService} from '../../services/http-loader.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpInfo} from '../../services/HttpInfo';
import {FunctionalErrorCodeService} from '../../services/functional-error-code.service';
import {Value} from '../../model/Value';
import {Impact} from '../../model/Impact';
import {ImpactDataService} from '../../services/data/impact-data.service';
import {CrossUiEventService, StakeholderReferencedByImpactsEvent} from '../../services/cross-ui-event.service';

@Component({
  selector: 'app-stakeholder-table',
  templateUrl: './stakeholder-table.component.html',
  styleUrls: ['./stakeholder-table.component.scss']
})
export class StakeholderTableComponent implements OnInit, AfterViewInit {
  @ViewChild(NgScrollbar) scrollbarRef!: NgScrollbar;
  @ViewChild(MatTable) table!: MatTable<Stakeholder>;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @Output() userWantsToSeeReferencedImpacts: EventEmitter<Stakeholder> = new EventEmitter();

  displayedColumns = ['prefixSequenceId', 'name', 'level', 'priority', 'impacted'];
  tableDataSource = new MatTableDataSource<Stakeholder>();
  windowScrolled = false;
  highlightFilter = '';

  constructor(private logger: LogService,
              public stakeholderData: StakeholderDataService,
              private analysisData: AnalysisDataService,
              private impactData: ImpactDataService,
              private httpLoader: HttpLoaderService,
              private crossUI: CrossUiEventService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.crossUI.stakeholderReferencedByImpacts.subscribe((event: StakeholderReferencedByImpactsEvent) => {
      this.logger.warn(this, 'This stakeholder is still being used by ' + event.impacts.length + ' impacts');
      const message = 'This stakeholder cannot be deleted. It is still being used by '
        + event.impacts.length + ' impact' + (event.impacts.length === 1 ? '' : 's') + '.';
      const action = 'show';
      const snackBarRef = this.snackBar.open(message, action, {duration: 5000});
      snackBarRef.onAction().subscribe(() => {
        this.logger.info(this, 'User wants to see the impacts referencing the stakeholder');
        this.crossUI.userWantsToSeeStakeholderReferencedByImpacts.emit(event);
      });
    });


    //
    // this.httpLoader.httpError.subscribe((httpInfo: HttpInfo) => {
    //   if (httpInfo.functionalErrorCode === FunctionalErrorCodeService.STAKEHOLDER_REFERENCED_BY_IMPACT) {
    //     const value = this.stakeholderData.stakeholders.find(s => s.id === httpInfo.tag);
    //     if (value) {
    //       const numImpactsUseValue = this.getReferencedImpacts(value);
    //       if (numImpactsUseValue > 0) {
    //         this.thwartValueOperation(value, numImpactsUseValue);
    //       }
    //     }
    //   }
    // });

    this.stakeholderData.loadedStakeholders.subscribe((stakeholders: Stakeholder[]) => {
      this.updateTableDataSource();
    });

    this.stakeholderData.createdStakeholder.subscribe((stakeholders: Stakeholder) => {
      this.updateTableDataSource();
    });

    this.stakeholderData.deletedStakeholder.subscribe((stakeholders: Stakeholder) => {
      this.updateTableDataSource();
    });

    this.updateTableDataSource();
  }

  ngAfterViewInit(): void {
    this.scrollbarRef?.scrolled.subscribe(e => {
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
      return stakeholder[property];
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

      const priorityFilter = searchTerms.priority.length === 0 || searchTerms.priority.indexOf(data.priority) !== -1;

      const impactedFilter = data.impacted != null && SliderFilterSettings.filter(searchTerms.impacted, data.impacted * -1);

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
