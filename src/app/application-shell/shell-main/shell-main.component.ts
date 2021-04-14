import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatTabGroup} from '@angular/material/tabs';
import {Router} from '@angular/router';
import {isDevMode} from '@angular/core';
import {LogService} from "../../shared/services/log.service";
import {ImpactMainComponent} from "../../impact/impact-main/impact-main.component";

@Component({
  selector: 'app-shell-main',
  templateUrl: './shell-main.component.html',
  styleUrls: ['./shell-main.component.scss', '../../layout/style/style.scss']
})
export class ShellMainComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTabGroup) tab!: MatTabGroup;
  @ViewChild(ImpactMainComponent) impactMain!: ImpactMainComponent;

  analysisId = '';

  constructor(
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
    // @ DevTeams: Change this to your tab index and do not commit it.
    if (isDevMode() && this.tab !== undefined) {
      this.tab.selectedIndex = 1;
    }
  }

  tabChanged(event: number) {
    this.logger.info(this, 'Selected Tab Changed to ' + event);

    switch (event) {
      case 1:
        this.impactMain.tabActivated();
        break;

      default:
        break;
    }
  }
}
