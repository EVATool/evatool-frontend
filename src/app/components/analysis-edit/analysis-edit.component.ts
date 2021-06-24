import {AfterViewInit, Component, isDevMode, OnInit, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-analysis-edit',
  templateUrl: './analysis-edit.component.html',
  styleUrls: ['./analysis-edit.component.scss']
})
export class AnalysisEditComponent implements OnInit, AfterViewInit {
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
    const id = this.route.snapshot.params['id'];

    console.log('__________________________');
    console.log(id);


    // Load current analysis.
    // this.router.routerState?.root.queryParams.subscribe(params => { // TODO change back to no elvis when tests are done
    //   const currentUrlIsAnalysis = this.router.url.includes('/analysis');
    //   const analysisIdIsUUID = params.id === undefined ?
    //     false : params.id.match('^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$');
    //
    //   if (currentUrlIsAnalysis) {
    //     if (analysisIdIsUUID) {
    //       this.logger.info(this, 'Extracted analysisId from Router: ' + params.id);
    //       this.changeCurrentAnalysis(params.id);
    //     } else {
    //       //this.router.navigate(['404']);
    //     }
    //   }
    // });

    this.crossUI.analysisWithIdNotFound.subscribe(() => {
      this.router.navigate([ROUTES.notFound]);
    });
  }

  ngAfterViewInit(): void {
    this.crossUI.userWantsToSeeStakeholderReferencedByImpacts.subscribe((event: StakeholderReferencedByImpactsEvent) => {
      this.tabGroup.selectedIndex = 1;
    });

    this.crossUI.userWantsToSeeImpactReferencedByRequirements.subscribe((event: ImpactReferencedByRequirementsEvent) => {
      this.tabGroup.selectedIndex = 2;
    });

    if (isDevMode()) {
      this.tabGroup.selectedIndex = 2;
    }
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
