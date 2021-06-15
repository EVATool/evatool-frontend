import {Component, OnInit} from '@angular/core';
import {LogService} from '../../services/log.service';
import {AnalysisDataService} from '../../services/data/analysis-data.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Analysis} from '../../model/Analysis';
import {AnalysisDialogComponent} from './analysis-dialog/analysis-dialog.component';
import {ConfirmationDialogComponent} from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private logger: LogService,
              public analysisData: AnalysisDataService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.analysisData.loadAnalyses();
  }

  openAnalysisDialog(analysis: Analysis): void {
    this.dialog.open(AnalysisDialogComponent, {
      height: '60%',
      width: '60%',
      data: {analysis: analysis}
    });
  }

  deleteAnalysis(analysis: Analysis): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.analysisData.deleteAnalysis(analysis);
      }
    });
  }

  openAnalysis(analysis: Analysis): void {
    this.router.navigate(['/analysis'], {queryParams: {id: analysis.id}, queryParamsHandling: 'merge'});
  }
}
