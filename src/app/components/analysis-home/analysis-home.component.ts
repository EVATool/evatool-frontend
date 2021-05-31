import {AfterViewInit, Component, isDevMode, OnInit, ViewChild} from '@angular/core';
import {LogService} from '../../services/log.service';
import {MatTabGroup} from '@angular/material/tabs';
import {AnalysisDataService} from '../../services/data/analysis-data.service';

@Component({
  selector: 'app-analysis-home',
  templateUrl: './analysis-home.component.html',
  styleUrls: ['./analysis-home.component.scss']
})
export class AnalysisHomeComponent implements AfterViewInit {
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  constructor(private logger: LogService,
              public analysisData: AnalysisDataService) {

  }

  ngAfterViewInit(): void {
    if (isDevMode()) {
      this.tabGroup.selectedIndex = 0;
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
