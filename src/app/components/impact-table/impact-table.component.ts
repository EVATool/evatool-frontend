import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {NgScrollbar} from 'ngx-scrollbar';
import {MatSort} from '@angular/material/sort';
import {Impact} from '../../model/Impact';
import {LogService} from '../../services/log.service';
import {ImpactDataService} from '../../services/data/impact-data.service';
import {ValueDataService} from '../../services/data/value-data.service';
import {StakeholderDataService} from '../../services/data/stakeholder-data.service';
import {AnalysisDataService} from '../../services/data/analysis-data.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SliderFilterSettings} from '../impact-slider/SliderFilterSettings';
import {ImpactTableFilterEvent} from '../impact-filter-bar/ImpactTableFilterEvent';
import {ValueDialogComponent} from '../value-dialog/value-dialog.component';
import {Value} from '../../model/Value';
import {Stakeholder} from '../../model/Stakeholder';
import {
  CrossUiEventService
} from '../../services/event/cross-ui-event.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ValueReferencedByImpactsEvent} from '../../services/event/events/http409/ValueReferencedByImpactsEvent';
import {StakeholderReferencedByImpactsEvent} from '../../services/event/events/http409/StakeholderReferencedByImpactsEvent';
import {ImpactReferencedByRequirementDeltasEvent} from '../../services/event/events/http409/ImpactReferencedByRequirementDeltasEvent';
import {ImpactDeletionFailedEvent} from '../../services/event/CrossUIEvents';

@Component({
  selector: 'app-impact-table',
  templateUrl: './impact-table.component.html',
  styleUrls: ['./impact-table.component.scss']
})
export class ImpactTableComponent implements OnInit, AfterViewInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  @ViewChild(NgScrollbar) scrollbarRef!: NgScrollbar;
  @ViewChild(MatTable) table!: MatTable<Impact>;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  displayedColumns = ['prefixSequenceId', 'stakeholder', 'value', 'merit', 'description'];
  tableDataSource = new MatTableDataSource<Impact>();
  windowScrolled = false;
  highlightFilter = '';
  deletionFlaggedValue!: Value;
  deletionFlaggedStakeholder!: Stakeholder;

  constructor(
    private logger: LogService,
    public impactDataService: ImpactDataService,
    public valueDataService: ValueDataService,
    public stakeholderDataService: StakeholderDataService,
    public analysisDataService: AnalysisDataService,
    private crossUI: CrossUiEventService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.crossUI.userWantsToSeeValueReferencedByImpacts
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: ValueReferencedByImpactsEvent) => {
        this.deletionFlaggedValue = event.value;
        event.impacts.forEach(impact => {
          impact.highlighted = true;
        });
      });

    this.crossUI.userWantsToSeeStakeholderReferencedByImpacts
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: StakeholderReferencedByImpactsEvent) => {
        this.deletionFlaggedStakeholder = event.stakeholder;
        event.impacts.forEach((impact: Impact) => {
          impact.highlighted = true;
        });
      });

    this.crossUI.impactReferencedByRequirements
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: ImpactReferencedByRequirementDeltasEvent) => {
        const message = 'This impact cannot be deleted. It is still being used by '
          + event.deltas.length + ' requirement' + (event.deltas.length === 1 ? '' : 's') + '.';
        const action = 'show';
        const snackBarRef = this.snackBar.open(message, action, {duration: 5000});
        snackBarRef.onAction()
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(() => {
            this.crossUI.userWantsToSeeImpactReferencedByRequirements.emit(event);
          });
      });

    this.crossUI.impactDeletionFailed
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: ImpactDeletionFailedEvent) => {
        if (event.notFound) {
          // TODO: remove from data service array (ALL table components + analysis).
          //  This should be done when concurrency is better understood, because child/parent entities also have to be deleted.
        } else {
          event.entity.deletionFlagged = false;
        }
      });

    this.impactDataService.loadedImpacts
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((impacts: Impact[]) => {
        this.updateTableDataSource();
      });

    this.impactDataService.createdImpact
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((impact: Impact) => {
        this.updateTableDataSource();
      });

    this.impactDataService.deletedImpact
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((impact: Impact) => {
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
    this.tableDataSource.data = this.impactDataService.impacts;
  }

  scrollToTop(): void {
    this.logger.info(this, 'Scroll To Top');
    const options = {top: 0, duration: 250};
    this.scrollbarRef.scrollTo(options);
  }

  initSorting(): void {
    this.logger.info(this, 'Init Sorting');
    this.tableDataSource.sort = this.sort;
    this.tableDataSource.sortingDataAccessor = (impact, property) => {
      switch (property) {
        case 'stakeholder':
          return impact.stakeholder.name;
        case 'value':
          return impact.value.name;
        default:
          return impact[property];
      }
    };
  }

  initFiltering(): void {
    this.logger.info(this, 'Init Filtering');
    this.tableDataSource.filterPredicate = this.createFilterPredicate();
  }

  createFilterPredicate(): (data: any, filter: string) => boolean {
    return (data: Impact, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      const stakeholderFilter = searchTerms.stakeholder.length === 0 || searchTerms.stakeholder.indexOf(data.stakeholder.name) !== -1;

      const valueFilter = searchTerms.value.length === 0 || searchTerms.value.indexOf(data.value.name) !== -1;

      const meritFilter = SliderFilterSettings.filter(searchTerms.merit, data.merit);

      return stakeholderFilter && valueFilter && meritFilter;
    };
  }

  updateFilter(event: ImpactTableFilterEvent): void {
    this.logger.info(this, 'Filter Changed');
    this.highlightFilter = event.highlight;
    this.tableDataSource.filter = JSON.stringify(event);
  }

  createImpact(): void {
    if (this.stakeholderDataService.stakeholders.length === 0) {
      const message = 'There must be at least one stakeholder for an impact to exist';
      const action = '';
      this.snackBar.open(message, action, {duration: 5000});
    } else if (this.valueDataService.values.length === 0) {
      const message = 'There must be at least one value for an impact to exist';
      const action = '';
      this.snackBar.open(message, action, {duration: 5000});
    }
    const impact = this.impactDataService.createDefaultImpact(
      this.analysisDataService.currentAnalysis,
      this.stakeholderDataService.stakeholders[0],
      this.valueDataService.values[0]);
    this.impactDataService.createImpact(impact);
  }

  updateImpact(impact: Impact): void {
    this.logger.info(this, 'Update Impact');
    if (impact.highlighted) {
      impact.highlighted = impact.value === this.deletionFlaggedValue
        || impact.stakeholder === this.deletionFlaggedStakeholder;
    }

    this.impactDataService.updateImpact(impact);
  }

  deleteImpact(impact: Impact): void {
    impact.deletionFlagged = true;
    this.impactDataService.deleteImpact(impact);
  }

  openValuesDialog(id?: string): void {
    this.logger.info(this, 'Opening Values Dialog');

    this.dialog.open(ValueDialogComponent, {
      height: '80%',
      width: '50%',
      data: {id}
    });
  }

  highlightImpactsByStakeholder(stakeholder: Stakeholder): void {
    this.deletionFlaggedStakeholder = stakeholder;
    this.impactDataService.impacts.forEach(impact => {
      impact.highlighted = impact.stakeholder === stakeholder;
    });
  }
}
