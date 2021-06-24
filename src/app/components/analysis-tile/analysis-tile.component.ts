import {Component, Input, OnInit} from '@angular/core';
import {Analysis} from '../../model/Analysis';
import {AnalysisDialogComponent} from '../analysis-dialog/analysis-dialog.component';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {ROUTES} from '../../app-routes';
import {MatDialog} from '@angular/material/dialog';
import {LogService} from '../../services/log.service';
import {Router} from '@angular/router';
import {AnalysisDataService} from '../../services/data/analysis-data.service';

@Component({
  selector: 'app-analysis-tile',
  templateUrl: './analysis-tile.component.html',
  styleUrls: ['./analysis-tile.component.scss']
})
export class AnalysisTileComponent implements OnInit {
  @Input() analysis!: Analysis;

  constructor(private logger: LogService,
              public analysisData: AnalysisDataService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openAnalysisDialog(analysis: Analysis): void {
    this.dialog.open(AnalysisDialogComponent, {
      height: '40%',
      width: '40%',
      data: {analysis: analysis}
    });
  }

  deleteAnalysis(analysis: Analysis): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this analysis?';

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.analysisData.deleteAnalysis(analysis);
      }
    });
  }

  openAnalysis(analysis: Analysis): void {
    this.router.navigate([ROUTES.analysis, analysis.id]);
  }
}
