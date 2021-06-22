import {Component, Inject, OnInit} from '@angular/core';
import {Analysis} from '../../model/Analysis';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AnalysisDataService} from '../../services/data/analysis-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-analysis-dialog',
  templateUrl: './analysis-dialog.component.html',
  styleUrls: ['./analysis-dialog.component.scss']
})
export class AnalysisDialogComponent implements OnInit {

  analysis!: Analysis;
  template!: Analysis;
  useTemplate = false;
  isEditingAnalysis!: boolean;
  goToAnalysis!: boolean;

  constructor(public analysisData: AnalysisDataService,
              private router: Router,
              private analysisDialogComponent: MatDialogRef<AnalysisDialogComponent>,
              private snackbar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.analysis = data.analysis;
    this.isEditingAnalysis = this.analysis.id != null;
    this.goToAnalysis = false;
  }

  ngOnInit(): void {
    this.analysisData.createdAnalysis.subscribe((analysis: Analysis) => {
      this.processServiceEvent(analysis);
    });

    this.analysisData.updatedAnalysis.subscribe((analysis: Analysis) => {
      this.processServiceEvent(analysis);
    });
  }

  processServiceEvent(analysis: Analysis): void {
    if (this.goToAnalysis) {
      this.openAnalysis(analysis);
    }
    this.analysisDialogComponent.close();
  }

  onSubmit(): void {
    if (this.isEditingAnalysis) {
      this.analysisData.updateAnalysis(this.analysis);
    } else {
      if (this.useTemplate) {
        this.analysisData.deepCopy(this.template, this.analysis);
      } else {
        this.analysisData.createAnalysis(this.analysis);
      }
    }
  }

  openAnalysis(analysis: Analysis): void {
    this.router.navigate(['/analysis'], {queryParams: {id: analysis.id}, queryParamsHandling: 'merge'});
  }
}
