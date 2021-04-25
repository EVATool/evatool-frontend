import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTabGroup} from '@angular/material/tabs';
import {Router} from '@angular/router';
import {LogService} from '../../shared/services/log.service';
import {ImpactMainComponent} from '../../impact/impact-main/impact-main.component';
import {RequirementsDataService} from '../../requirement/services/requirements/requirements-data.service';
import {StakeholderDataService} from '../../stakeholder/service/stakeholder-data.service';
import {RequirementMainComponent} from "../../requirement/requirement-main/requirement-main.component";

@Component({
  selector: 'app-shell-main',
  templateUrl: './shell-main.component.html',
  styleUrls: ['./shell-main.component.scss', '../../layout/style/style.scss']
})
export class ShellMainComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTabGroup) tab!: MatTabGroup;
  @ViewChild(ImpactMainComponent) impactMain!: ImpactMainComponent;
  @ViewChild(RequirementMainComponent) requirementMainComponent!: RequirementMainComponent;

  analysisId = '';

  constructor(
    private requirementsDataService: RequirementsDataService,
    private stakeholderDataService: StakeholderDataService,
    private logger: LogService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.router.routerState.root.queryParams
      .subscribe(params => {
        this.analysisId = params.id;
      });

    if (this.analysisId === undefined) {
      console.log('Throw error? How to handle this? This should not be allowed.');
    }
  }

  ngAfterViewInit(): void {

  }

  tabChanged(event: number): void {
    this.logger.info(this, 'Selected Tab Changed to ' + event);
    if (event === 0){
      this.stakeholderDataService.loadStakeholder();
    }else if (event === 2){
      this.requirementsDataService.onInit();
      this.requirementMainComponent.tabActivated();
    }else if (event === 1){
      this.impactMain.tabActivated();
    }
  }
}
