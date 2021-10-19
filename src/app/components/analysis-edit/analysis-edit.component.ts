import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-analysis-edit',
  templateUrl: './analysis-edit.component.html',
  styleUrls: ['./analysis-edit.component.scss']
})
export class AnalysisEditComponent implements OnInit, AfterViewInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  @ViewChild(StakeholderEditComponent) stakeholdersComponent!: StakeholderEditComponent;
  @ViewChild(ImpactEditComponent) impactsComponent!: ImpactEditComponent;

  private tabNames = ['Stakeholder', 'Value', 'Impact', 'Variant', 'Requirement', 'Dashboard'];

  constructor(private logger: LogService,
              public analysisData: AnalysisDataService,
              private crossUI: CrossUiEventService,
              private router: Router,
              private route: ActivatedRoute,
              private translate: TranslateService) {
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

    this.crossUI.userWantsToNavigateToStakeholderTab
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.navigateToTabByName('Stakeholder');
      });

    this.crossUI.userNavigatedToAnalysis.next();
  }

  ngAfterViewInit(): void {
    this.activateTabFromUrl();
  }

  ngOnDestroy(): void {
    this.crossUI.userLeftCurrentAnalysisEdit.next();
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

  activateTabFromUrl(): void {
    const tab = this.route.snapshot.queryParams?.tab;
    if (!tab) {
      return;
    }

    this.navigateToTabByName(tab);
  }

  private navigateToTabByName(tab: string): void {
    this.tabGroup.selectedIndex = this.tabNames.indexOf(tab);
  }

  putTabInUrl(index: number): void {
    const currentTabParams: Params = {tab: this.tabNames[index]};
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: currentTabParams,
        queryParamsHandling: 'merge',
      });
  }
}
