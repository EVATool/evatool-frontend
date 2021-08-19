import {Component, Input, OnInit} from '@angular/core';
import {Analysis} from '../../model/Analysis';
import {AnalysisDialogComponent} from '../analysis-dialog/analysis-dialog.component';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {ROUTES} from '../../app-routes';
import {MatDialog} from '@angular/material/dialog';
import {LogService} from '../../services/log.service';
import {Router} from '@angular/router';
import {AnalysisDataService} from '../../services/data/analysis-data.service';
import {AnalysisDeletionFailedEvent, CrossUiEventService} from '../../services/cross-ui-event.service';

@Component({
  selector: 'app-analysis-tile',
  templateUrl: './analysis-tile.component.html',
  styleUrls: ['./analysis-tile.component.scss']
})
export class AnalysisTileComponent implements OnInit {
  @Input() analysis!: Analysis;
  @Input() inSelectionMode!: boolean;

  constructor(private logger: LogService,
              public analysisData: AnalysisDataService,
              private crossUI: CrossUiEventService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.crossUI.analysisDeletionFailed.subscribe((event: AnalysisDeletionFailedEvent) => {
      event.entity.deletionFlagged = false;
    });
  }

  openAnalysisDialog(analysis: Analysis): void {
    this.dialog.open(AnalysisDialogComponent, {
      height: '40%',
      width: '40%',
      data: {analysis}
    });
  }

  deleteAnalysis(analysis: Analysis): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this analysis?';

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        analysis.deletionFlagged = true;
        this.analysisData.deleteAnalysis(analysis);
      }
    });
  }

  clickAnalysisTile(analysis: Analysis): void {
    if (this.inSelectionMode) {
      this.analysis.selected = !this.analysis.selected;
    } else { // Open analysis.
      this.router.navigate([ROUTES.analysis, analysis.id]);
    }
  }
}
