import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {StakeholderDataService} from '../../services/data/stakeholder-data.service';
import {Stakeholder} from '../../model/Stakeholder';
import {MatRow, MatTable, MatTableDataSource} from '@angular/material/table';
import {AnalysisDataService} from '../../services/data/analysis-data.service';
import {StakeholderTableFilterEvent} from '../stakeholder-filter-bar/StakeholderTableFilterEvent';
import {LogService} from '../../services/log.service';
import {NgScrollbar} from 'ngx-scrollbar';
import {MatSort} from '@angular/material/sort';
import {SliderFilterSettings} from '../impact-slider/SliderFilterSettings';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ImpactDataService} from '../../services/data/impact-data.service';
import {CrossUiEventService} from '../../services/event/cross-ui-event.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {StakeholderReferencedByImpactsEvent} from '../../services/event/events/http409/StakeholderReferencedByImpactsEvent';
import {StakeholderDeletionFailedEvent} from '../../services/event/events/DeletionFailedEvents';
import {newRowAnimation} from '../../animations/NewRowAnimation';
import {EntityTableComponent} from '../abstract/entity-table/entity-table.component';

@Component({
  selector: 'app-stakeholder-table',
  templateUrl: './stakeholder-table.component.html',
  styleUrls: ['./stakeholder-table.component.scss'],
  animations: [newRowAnimation]
})
export class StakeholderTableComponent extends EntityTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(NgScrollbar) scrollbarRef!: NgScrollbar;
  @ViewChild(MatTable) table!: MatTable<Stakeholder>;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChildren(MatRow, {read: ViewContainerRef}) rows!: QueryList<ViewContainerRef>;
  @Output() userWantsToSeeReferencedImpacts: EventEmitter<Stakeholder> = new EventEmitter();

  displayedColumns = ['prefixSequenceId', 'name', 'level', 'priority', 'impacted'];
  tableDataSource = new MatTableDataSource<Stakeholder>();
  filterEvent!: StakeholderTableFilterEvent;

  constructor(public stakeholderData: StakeholderDataService,
              private analysisData: AnalysisDataService,
              private impactData: ImpactDataService,
              private crossUI: CrossUiEventService,
              private snackBar: MatSnackBar,
              protected logger: LogService) {
    super(logger);
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
        setTimeout(() => {
          const index = this.getRowIndex(stakeholders[-1]);
          this.scrollToIndex(index);
        }, 10);
      });

    this.stakeholderData.deletedStakeholder
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((stakeholders: Stakeholder) => {
        this.updateTableDataSource();
      });

    this.crossUI.highlightTextChanged
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((highlightText: string) => {
        this.highlightFilter = highlightText;
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
    this.logger.trace(this, 'Scroll To Top');
    const options = {top: 0, duration: 250};
    this.scrollbarRef.scrollTo(options);
  }

  scrollToBottom(): void {
    this.logger.trace(this, 'Scroll To Bottom');
    const options = {bottom: -100, duration: 250};
    this.scrollbarRef.scrollTo(options);
  }

  scrollToIndex(index: number): void {
    index--;
    const row = this.rows.find(r => r.element.nativeElement.rowIndex === index);
    if (row) {
      const options = {duration: 250}; // TODO get options into scroll call.
      row.element.nativeElement.scrollIntoView(true);
    } else {
      console.log('Row at index ' + (index) + ' not found');
    }
  }

  // TODO return index more reliable. This sometimes fails to scroll (when changing the sorting and adding a new row).
  getRowIndex(stakeholder: Stakeholder): number {
    const row = this.rows.get(this.rows.length - 1);
    if (row) {
      return row.element.nativeElement.sectionRowIndex;
    } else {
      return 0;
    }
  }

  initSorting(): void {
    this.logger.trace(this, 'Init Sorting');
    this.tableDataSource.sort = this.sort;
    this.tableDataSource.sortingDataAccessor = (stakeholder, property) => {
      switch (property) {
        case 'priority':
          const stakeholderPriority = stakeholder[property];
          return -this.stakeholderData.stakeholderPriorities.indexOf(stakeholderPriority);
        case 'level':
          const stakeholderLevel = stakeholder[property];
          return -this.stakeholderData.stakeholderLevels.indexOf(stakeholderLevel);
        default:
          return stakeholder[property];
      }
    };
  }

  initFiltering(): void {
    this.logger.trace(this, 'Init Filtering');
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
    // Get valid default stakeholder.
    const stakeholder = this.stakeholderData.createDefaultStakeholder(this.analysisData.currentAnalysis);

    // Ensure visibility with current filter settings.
    if (this.filterEvent) {
      if (this.filterEvent.level.length !== 0) {
        stakeholder.level = this.filterEvent.level[0];
      }
      if (this.filterEvent.priority.length !== 0) {
        stakeholder.priority = this.filterEvent.priority[0];
      }
    }

    this.stakeholderData.createStakeholder(stakeholder);
  }

  updateStakeholder(stakeholder: Stakeholder): void {
    this.stakeholderData.updateStakeholder(stakeholder);
  }

  deleteStakeholder(stakeholder: Stakeholder): void {
    stakeholder.deletionFlagged = true;
    this.stakeholderData.deleteStakeholder(stakeholder);
  }

  updateFilter(event: StakeholderTableFilterEvent): void {
    this.logger.trace(this, 'Filter Changed');
    this.filterEvent = event;
    this.tableDataSource.filter = JSON.stringify(event);
  }
}
