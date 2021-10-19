import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LogService} from '../../services/log.service';
import {AnalysisDataService} from '../../services/data/analysis-data.service';
import {StakeholderEditComponent} from '../stakeholder-edit/stakeholder-edit.component';
import {ImpactEditComponent} from '../impact-edit/impact-edit.component';
import {CrossUiEventService} from '../../services/event/cross-ui-event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ROUTES, TAB_ROUTES} from '../../app-routes';
import * as uuid from 'uuid';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {ImpactsReferencingStakeholderEvent} from '../../services/event/events/http409/ImpactsReferencingStakeholderEvent';
import {RequirementDeltasReferencingImpactEvent} from '../../services/event/events/http409/RequirementDeltasReferencingImpactEvent';
import {ArchivedValueReferencedByImpact} from '../../services/event/events/local/ArchivedValueReferencedByImpact';
import {ArchivedVariantReferencedByRequirement} from '../../services/event/events/local/ArchivedVariantReferencedByRequirement';
import {TranslateService} from '@ngx-translate/core';
import {OUTLETS} from '../../app-outlets';

@Component({
  selector: 'app-analysis-edit',
  templateUrl: './analysis-edit.component.html',
  styleUrls: ['./analysis-edit.component.scss']
})
export class AnalysisEditComponent implements OnInit, AfterViewInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  links: any[];
  @ViewChild(StakeholderEditComponent) stakeholdersComponent!: StakeholderEditComponent;
  @ViewChild(ImpactEditComponent) impactsComponent!: ImpactEditComponent;

  constructor(private logger: LogService,
              public analysisData: AnalysisDataService,
              private crossUI: CrossUiEventService,
              private router: Router,
              private route: ActivatedRoute,
              private translate: TranslateService) {
    this.links = [
      {
        name: 'Stakeholder',
        path: '(' + OUTLETS.TAB_OUTLET + ':' + TAB_ROUTES.stakeholder + ')',
        translation: 'COMMON.ENTITY.STAKEHOLDER'
      },
      {
        name: 'Value',
        path: '(' + OUTLETS.TAB_OUTLET + ':' + TAB_ROUTES.value + ')',
        translation: 'COMMON.ENTITY.VALUE'
      },
    ];
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

  }

  ngOnDestroy(): void {
    this.crossUI.userLeftCurrentAnalysisEdit.next();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  navigateToTabByName(name: string): void {
    const link = this.links.find(l => l.name === name);
    if (link) {
      this.navigateToSubRouteTab(link.path);
    } else {
      this.logger.error(this, 'Not tab found by name ' + name);
    }
  }

  navigateToSubRouteTab(path: string): void {
    this.router.navigateByUrl(ROUTES.analysis + '/' + this.analysisData.currentAnalysis.id + '/' + path);
  }
}
