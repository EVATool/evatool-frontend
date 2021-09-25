import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {StakeholderDataService} from '../../services/data/stakeholder-data.service';
import {Stakeholder} from '../../model/Stakeholder';
import {MatTableDataSource} from '@angular/material/table';
import {AnalysisDataService} from '../../services/data/analysis-data.service';
import {StakeholderTableFilterEvent} from '../stakeholder-filter-bar/StakeholderTableFilterEvent';
import {LogService} from '../../services/log.service';
import {SliderFilterSettings} from '../impact-slider/SliderFilterSettings';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ImpactDataService} from '../../services/data/impact-data.service';
import {CrossUiEventService} from '../../services/event/cross-ui-event.service';
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
    super.onInit();

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
    super.afterViewInit();
  }

  ngOnDestroy(): void {
    super.onDestroy();
  }

  updateTableDataSource(): void {
    this.tableDataSource.data = this.stakeholderData.stakeholders;
  }

  createDataAccessor(): (stakeholder: Stakeholder, property: string) => any {
    return (stakeholder, property) => {
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
}
