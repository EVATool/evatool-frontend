import {AfterViewInit, Component, isDevMode, ViewChild} from '@angular/core';
import {LogService} from '../../services/log.service';
import {MatTabGroup} from '@angular/material/tabs';
import {AnalysisDataService} from '../../services/data/analysis-data.service';
import {Value} from '../../model/Value';
import {Stakeholder} from '../../model/Stakeholder';
import {StakeholderEditComponent} from '../stakeholder-edit/stakeholder-edit.component';
import {ImpactEditComponent} from '../impact-edit/impact-edit.component';
import {
  CrossUiEventService,
  ImpactReferencedByRequirementsEvent,
  StakeholderReferencedByImpactsEvent
} from '../../services/cross-ui-event.service';

@Component({
  selector: 'app-analysis-edit',
  templateUrl: './analysis-edit.component.html',
  styleUrls: ['./analysis-edit.component.scss']
})
export class AnalysisEditComponent implements AfterViewInit {
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  @ViewChild(StakeholderEditComponent) stakeholdersComponent!: StakeholderEditComponent;
  @ViewChild(ImpactEditComponent) impactsComponent!: ImpactEditComponent;

  constructor(private logger: LogService,
              public analysisData: AnalysisDataService,
              private crossUI: CrossUiEventService) {

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