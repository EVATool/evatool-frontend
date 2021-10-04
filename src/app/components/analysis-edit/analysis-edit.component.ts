import {AfterViewInit, Component, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {LogService} from '../../services/log.service';
import {MatTabGroup} from '@angular/material/tabs';
import {AnalysisDataService} from '../../services/data/analysis-data.service';
import {StakeholderEditComponent} from '../stakeholder-edit/stakeholder-edit.component';
import {ImpactEditComponent} from '../impact-edit/impact-edit.component';
import {CrossUiEventService} from '../../services/event/cross-ui-event.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ROUTES} from '../../app-routes';
import * as uuid from 'uuid';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {ImpactsReferencingStakeholderEvent} from '../../services/event/events/http409/ImpactsReferencingStakeholderEvent';
import {RequirementDeltasReferencingImpactEvent} from '../../services/event/events/http409/RequirementDeltasReferencingImpactEvent';
import {ArchivedValueReferencedByImpact} from '../../services/event/events/local/ArchivedValueReferencedByImpact';
import {ArchivedVariantReferencedByRequirement} from '../../services/event/events/local/ArchivedVariantReferencedByRequirement';

@Component({
  selector: 'app-analysis-edit',
  templateUrl: './analysis-edit.component.html',
  styleUrls: ['./analysis-edit.component.scss']
})
export class AnalysisEditComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output()

  private ngUnsubscribe = new Subject();

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  @ViewChild(StakeholderEditComponent) stakeholdersComponent!: StakeholderEditComponent;
  @ViewChild(ImpactEditComponent) impactsComponent!: ImpactEditComponent;

  constructor(private logger: LogService,
              public analysisData: AnalysisDataService,
              private crossUI: CrossUiEventService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // Load current analysis.
    const analysisId = this.route.snapshot.params?.id;
    const analysisIdIsUUID = uuid.validate(analysisId);
    if (analysisIdIsUUID || (environment.testing && analysisId != null)) {
      this.analysisData.changeCurrentAnalysis(analysisId);
    } else {
      this.router.navigate([ROUTES.pageNotFound]);
    }

    this.crossUI.analysisNotFound
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.router.navigate([ROUTES.pageNotFound]);
      });

    this.crossUI.userWantsToSeeImpactsReferencingStakeholder
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: ImpactsReferencingStakeholderEvent) => {
        this.navigateToTabByName('Impact');
      });

    this.crossUI.userWantsToSeeRequirementsReferencingImpact
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: RequirementDeltasReferencingImpactEvent) => {
        this.navigateToTabByName('Requirement');
      });

    this.crossUI.userWantsToSeeArchivedValueReferencedByImpact
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: ArchivedValueReferencedByImpact) => {
        this.navigateToTabByName('Value');
      });

    this.crossUI.userWantsToSeeArchivedVariantReferencedByRequirement
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: ArchivedVariantReferencedByRequirement) => {
        this.navigateToTabByName('Variant');
      });

    this.crossUI.userWantsToNavigateToValueTab
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.navigateToTabByName('Value');
      });

    this.crossUI.userNavigatedToAnalysis.emit();
  }

  ngAfterViewInit(): void {
    this.activateTabFromUrl();
  }

  ngOnDestroy(): void {
    this.crossUI.userLeftCurrentAnalysisEdit.emit();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  tabChanged(event: number): void {
    this.logger.debug(this, 'Selected Tab Changed to ' + event);
    this.putTabInUrl(event);
    switch (event) {
      case 0:
        break;

      case 1:
        break;

      case 2:
        break;

      case 3:
        break;

      case 4:
        break;

      default:
        this.logger.warn(this, 'Unknown tab');
        break;
    }
  }

  // TODO Use another nested/auxiliary router outlet for the tabs
  //  Url should look like this: /analysis/UUID/Stakeholders
  // TODO Tab change on reload causes tabs to be briefly shown when the tab change animation plays
  activateTabFromUrl(): void {
    const tab = this.route.snapshot.queryParams?.tab;
    if (!tab) {
      return;
    }

    this.navigateToTabByName(tab);
  }

  private navigateToTabByName(tab: string): void {
    for (let i = 0; i < this.tabGroup._allTabs.length; i++) {
      const tabName = this.tabGroup._allTabs.get(i)?.textLabel;
      if (tabName === tab) {
        this.tabGroup.selectedIndex = i;
        break;
      }
    }
    this.logger.warn(this, 'Tab with name ' + tab + ' not found');
  }

  putTabInUrl(index: number): void {
    const currentTabParams: Params = {tab: this.tabGroup._allTabs.get(index)?.textLabel};
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: currentTabParams,
        queryParamsHandling: 'merge',
      });
  }
}
