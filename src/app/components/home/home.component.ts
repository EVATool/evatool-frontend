import {Component, OnInit} from '@angular/core';
import {LogService} from '../../services/log.service';
import {AnalysisDataService} from '../../services/data/analysis-data.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Analysis} from '../../model/Analysis';
import {AnalysisDialogComponent} from '../analysis-dialog/analysis-dialog.component';
import {AnalysisDeletionFailedEvent, CrossUiEventService} from '../../services/cross-ui-event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  analyses: Analysis[] = [];
  analysisNameFilter = '';
  showAnalyses = true;
  showTemplates = true;
  sortByIsTemplateAsc = true;
  sortByLastEditedAsc = true;

  constructor(private logger: LogService,
              public analysisData: AnalysisDataService,
              private crossUI: CrossUiEventService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.analysisData.loadedAnalyses.subscribe(() => {
      this.updateData(this.analysisData.analyses);
    });

    this.analysisData.createdAnalysis.subscribe(() => {
      this.updateData(this.analysisData.analyses);
    });

    this.analysisData.deletedAnalysis.subscribe(() => {
      this.updateData(this.analysisData.analyses);
    });

    this.analysisData.loadAnalyses();
  }

  updateData(analyses: Analysis[]): void {
    let temp = analyses.sort(this.sortByIsTemplate);
    if (!this.sortByIsTemplateAsc) {
      temp = temp.reverse();
    }
    //temp = temp.sort(this.sortByLastUpdated);
    this.analyses = temp;
  }

  sortByIsTemplate(a: Analysis, b: Analysis): number {
    if (a.isTemplate === b.isTemplate) {
      return 0;
    } else if (a.isTemplate && !b.isTemplate) {
      return 1;
    } else {
      return -1;
    }
  }

  sortByLastUpdated(a: Analysis, b: Analysis): number {
    if (a.lastUpdated === b.lastUpdated) {
      return 0;
    } else if (a.lastUpdated < b.lastUpdated) {
      return 1;
    } else {
      return -1;
    }
  }

  openAnalysisDialog(analysis: Analysis): void {
    this.dialog.open(AnalysisDialogComponent, {
      height: '40%',
      width: '40%',
      data: {analysis: analysis}
    });
  }
}
