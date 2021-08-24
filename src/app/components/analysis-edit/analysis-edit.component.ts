import {AfterViewInit, Component, isDevMode, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LogService} from '../../services/log.service';
import {MatTabGroup} from '@angular/material/tabs';
import {AnalysisDataService} from '../../services/data/analysis-data.service';
import {StakeholderEditComponent} from '../stakeholder-edit/stakeholder-edit.component';
import {ImpactEditComponent} from '../impact-edit/impact-edit.component';
import {
  CrossUiEventService,
  ImpactReferencedByRequirementsEvent,
  StakeholderReferencedByImpactsEvent
} from '../../services/cross-ui-event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ROUTES} from '../../app-routes';
import * as uuid from 'uuid';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

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
    if (analysisIdIsUUID) {
      this.analysisData.changeCurrentAnalysis(analysisId);
    } else {
      this.router.navigate([ROUTES.pageNotFound]);
    }

    this.crossUI.analysisWithValidIdNotFound
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.router.navigate([ROUTES.pageNotFound]);
      });

    this.crossUI.userWantsToSeeStakeholderReferencedByImpacts
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: StakeholderReferencedByImpactsEvent) => {
        this.tabGroup.selectedIndex = 1;
      });

    this.crossUI.userWantsToSeeImpactReferencedByRequirements
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: ImpactReferencedByRequirementsEvent) => {
        this.tabGroup.selectedIndex = 2;
      });
  }

  ngAfterViewInit(): void {
    if (isDevMode()) {
      this.tabGroup.selectedIndex = 0;
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  tabChanged(event: number): void {
    this.logger.info(this, 'Selected Tab Changed to ' + event);

    switch (event) {
      case 0:

        break;

      case 1:

        break;

      case 2:

        break;

      case 3:

        break;

      default:
        this.logger.warn(this, 'Unknown tab');
        break;
    }
  }
}
