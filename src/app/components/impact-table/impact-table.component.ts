import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
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
import {Value} from '../../model/Value';
import {Stakeholder} from '../../model/Stakeholder';
import {CrossUiEventService} from '../../services/event/cross-ui-event.service';
import {takeUntil} from 'rxjs/operators';
import {ImpactsReferencingValueEvent} from '../../services/event/events/http409/ImpactsReferencingValueEvent';
import {ImpactsReferencingStakeholderEvent} from '../../services/event/events/http409/ImpactsReferencingStakeholderEvent';
import {RequirementDeltasReferencingImpactEvent} from '../../services/event/events/http409/RequirementDeltasReferencingImpactEvent';
import {ImpactDeletionFailedEvent} from '../../services/event/events/DeletionFailedEvents';
import {EntityTableComponent} from '../abstract/entity-table/entity-table.component';
import {ArchivedValueReferencedByImpact} from '../../services/event/events/local/ArchivedValueReferencedByImpact';
import {TranslateService} from '@ngx-translate/core';
import {stringFormat} from '../../extensions/string.extensions';

@Component({
  selector: 'app-impact-table',
  templateUrl: './impact-table.component.html',
  styleUrls: ['./impact-table.component.scss']
})
export class ImpactTableComponent extends EntityTableComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['prefixSequenceId', 'stakeholder', 'value', 'merit', 'description'];
  tableDataSource = new MatTableDataSource<Impact>();
  filterEvent!: ImpactTableFilterEvent;

  deletionFlaggedValue!: Value;
  deletionFlaggedStakeholder!: Stakeholder;

  constructor(
    protected logger: LogService,
    public impactDataService: ImpactDataService,
    public valueDataService: ValueDataService,
    public stakeholderDataService: StakeholderDataService,
    public analysisDataService: AnalysisDataService,
    private crossUI: CrossUiEventService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private translate: TranslateService) {
    super(logger);
  }

  ngOnInit(): void {
    super.onInit();

    this.crossUI.userWantsToSeeImpactsReferencingValue
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: ImpactsReferencingValueEvent) => {
        this.deletionFlaggedValue = event.value;
        event.impacts.forEach(impact => {
          impact.highlighted = true;
        });
      });

    this.crossUI.userWantsToSeeImpactsReferencingStakeholder
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: ImpactsReferencingStakeholderEvent) => {
        this.deletionFlaggedStakeholder = event.stakeholder;
        event.impacts.forEach((impact: Impact) => {
          impact.highlighted = true;
        });
      });

    this.crossUI.impactReferencedByRequirements
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: RequirementDeltasReferencingImpactEvent) => {
        this.translate.get('IMPACT_TYPE_TABLE.STILL_REFERENCED_BY_REQUIREMENTS', {value: 'world'}).subscribe((res: string) => {
          const action = 'show';
          const snackBarRef = this.snackBar.open(stringFormat(res, String(event.deltas.length)), action, {duration: 5000});
          snackBarRef.onAction()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
              this.logger.info(this, 'User wants to see the requirements referencing the impact');
              this.crossUI.userWantsToSeeRequirementsReferencingImpact.emit(event);
            });
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
        // TODO scroll to newly created row.
      });

    this.impactDataService.deletedImpact
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((impact: Impact) => {
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
    this.tableDataSource.data = this.impactDataService.impacts;
  }

  createDataAccessor(): (impact: Impact, property: string) => any {
    return (impact, property) => {
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

  createFilterPredicate(): (data: any, filter: string) => boolean {
    return (data: Impact, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      const stakeholderFilter = searchTerms.stakeholder.length === 0 || searchTerms.stakeholder.indexOf(data.stakeholder.name) !== -1;

      const valueFilter = searchTerms.value.length === 0 || searchTerms.value.indexOf(data.value.name) !== -1;

      const meritFilter = SliderFilterSettings.filter(searchTerms.merit, data.merit);

      return stakeholderFilter && valueFilter && meritFilter;
    };
  }

  createImpact(): void {
    if (this.stakeholderDataService.stakeholders.length === 0) {
      this.translate.get('IMPACT_TABLE.STAKEHOLDER_REQUIRED', {value: 'world'}).subscribe((message: string) => {
        this.translate.get('COMMON.CREATE', {value: 'world'}).subscribe((action: string) => {
          this.snackBar.open(message, action, {duration: 5000}).onAction()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
              this.crossUI.userWantsToNavigateToStakeholderTab.emit();
            });
        });
      });
    } else if (this.valueDataService.values.length === 0) {
      this.translate.get('IMPACT_TABLE.VALUE_REQUIRED', {value: 'world'}).subscribe((message: string) => {
        this.translate.get('COMMON.CREATE', {value: 'world'}).subscribe((action: string) => {
          this.snackBar.open(message, action, {duration: 5000}).onAction()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
              this.crossUI.userWantsToNavigateToValueTab.emit();
            });
        });
      });
    } else {
      // Get valid default impact.
      const impact = this.impactDataService.createDefaultImpact(
        this.analysisDataService.currentAnalysis,
        this.stakeholderDataService.stakeholders[0],
        this.valueDataService.values[0]);

      // Ensure visibility with current filter settings.
      if (this.filterEvent) {
        if (this.filterEvent.stakeholder.length !== 0) {
          const stakeholder = this.stakeholderDataService.stakeholders.find(s => s.name === this.filterEvent.stakeholder[0]);
          if (stakeholder) {
            impact.stakeholder = stakeholder;
          }
        }
        if (this.filterEvent.value.length !== 0) {
          const value = this.valueDataService.values.find(v => v.name === this.filterEvent.value[0]);
          if (value) {
            impact.value = value;
          }
        }
        if (!SliderFilterSettings.filter(this.filterEvent.merit, impact.merit)) {
          const minValue = Math.min(this.filterEvent.merit.sliderFilterValues[0], this.filterEvent.merit.sliderFilterValues[1]);
          const maxValue = Math.max(this.filterEvent.merit.sliderFilterValues[0], this.filterEvent.merit.sliderFilterValues[1]);
          const defaultMerit = minValue < 0 ? maxValue : minValue;
          impact.merit = defaultMerit;
        }
      }

      this.impactDataService.createImpact(impact);
    }
  }

  updateImpact(impact: Impact): void {
    this.logger.trace(this, 'Update Impact');
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

  emitArchivedReferenced(value: Value, impact: Impact): void {
    const event = new ArchivedValueReferencedByImpact(value, impact);
    this.crossUI.userWantsToSeeArchivedValueReferencedByImpact.emit(event);
  }
}
