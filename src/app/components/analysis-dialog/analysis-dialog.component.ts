import {Component, Inject, OnInit} from '@angular/core';
import {Analysis} from '../../model/Analysis';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AnalysisDataService} from '../../services/data/analysis-data.service';
import {Router} from '@angular/router';
import {ROUTES} from '../../app-routes';

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
              private dialogRef: MatDialogRef<AnalysisDialogComponent>,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.analysis = data.analysis;
    this.isEditingAnalysis = this.analysis.id != null;
    this.goToAnalysis = false;
  }

  ngOnInit(): void {
    this.analysisData.createdAnalysis.subscribe((analysis: Analysis) => {
      this.submitButtonClick(analysis);
    });
  }

  submitButtonClick(analysis: Analysis): void {
    if (this.goToAnalysis) {
      this.openAnalysis(analysis);
    }
    this.dialogRef.close();
  }

  updateAnalysis(analysis: Analysis): void {
    if (this.isEditingAnalysis) {
      this.analysisData.updateAnalysis(analysis);
    }
  }

  onSubmit(): void {
    if (this.isEditingAnalysis) {
      this.submitButtonClick(this.analysis);
    } else {
      if (this.useTemplate) {
        if (this.template === undefined) {
          const message = 'You have to select a template';
          const action = '';
          this.snackBar.open(message, action, {duration: 5000});
        } else {
          this.analysisData.deepCopy(this.template, this.analysis);
        }
      } else {
        this.analysisData.createAnalysis(this.analysis);
      }
    }
  }

  openAnalysis(analysis: Analysis): void {
    this.router.navigate([ROUTES.analysis, analysis.id]);
  }
}
