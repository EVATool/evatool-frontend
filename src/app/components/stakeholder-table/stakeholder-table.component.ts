import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {StakeholderDataService} from '../../services/data/stakeholder-data.service';
import {Stakeholder} from '../../model/Stakeholder';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {AnalysisDataService} from '../../services/data/analysis-data.service';
import {StakeholderTableFilterEvent} from '../stakeholder-filter-bar/StakeholderTableFilterEvent';
import {LogService} from '../../services/log.service';
import {NgScrollbar} from 'ngx-scrollbar';
import {MatSort} from '@angular/material/sort';
import {SliderFilterSettings} from '../impact-slider/SliderFilterSettings';
import {HttpMarshallService} from '../../services/http/http-marshall.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ImpactDataService} from '../../services/data/impact-data.service';
import {
  CrossUiEventService,
  StakeholderDeletionFailedEvent,
  StakeholderReferencedByImpactsEvent
} from '../../services/event/cross-ui-event.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-stakeholder-table',
  templateUrl: './stakeholder-table.component.html',
  styleUrls: ['./stakeholder-table.component.scss']
})
export class StakeholderTableComponent implements OnInit, AfterViewInit, OnDestroy {

  private ngUnsubscribe = new Subject();

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
              private crossUI: CrossUiEventService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.crossUI.stakeholderReferencedByImpacts
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: StakeholderReferencedByImpactsEvent) => {
        this.logger.warn(this, 'This stakeholder is still being used by ' + event.impacts.length + ' impacts');
        const message = 'This stakeholder cannot be deleted. It is still being used by '
          + event.impacts.length + ' impact' + (event.impacts.length === 1 ? '' : 's') + '.';
        const action = 'show';
        const snackBarRef = this.snackBar.open(message, action, {duration: 5000});
        snackBarRef.onAction()
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(() => {
            this.logger.info(this, 'User wants to see the impacts referencing the stakeholder');
            this.crossUI.userWantsToSeeStakeholderReferencedByImpacts.emit(event);
          });
      });

    this.crossUI.stakeholderDeletionFailed
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: StakeholderDeletionFailedEvent) => {
        event.entity.deletionFlagged = false;
      });

    this.stakeholderData.loadedStakeholders
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((stakeholders: Stakeholder[]) => {
        this.updateTableDataSource();
      });

    this.stakeholderData.createdStakeholder
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((stakeholders: Stakeholder) => {
        this.updateTableDataSource();
      });

    this.stakeholderData.deletedStakeholder
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((stakeholders: Stakeholder) => {
        this.updateTableDataSource();
      });

    this.updateTableDataSource();
  }

  ngAfterViewInit(): void {
    this.scrollbarRef?.scrolled
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(e => {
        this.windowScrolled = e.target.scrollTop !== 0;
      });

    this.initSorting();
    this.initFiltering();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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

      const impactedFilter = data.impacted === null || SliderFilterSettings.filter(searchTerms.impacted, data.impacted * -1);

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
    stakeholder.deletionFlagged = true;
    this.stakeholderData.deleteStakeholder(stakeholder);
  }

  updateFilter(event: StakeholderTableFilterEvent): void {
    this.logger.info(this, 'Filter Changed');
    this.highlightFilter = event.highlight;
    this.tableDataSource.filter = JSON.stringify(event);
  }
}
