import {Component, Inject, Input, OnInit} from '@angular/core';
import {AnalysisDataService} from "../services/analysis/analysis-data.service";
import {Analysis} from "../model/Analysis";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AnalysisRestService} from "../services/analysis/analysis-rest.service";
import {AnalysisDTO} from "../model/AnalysisDTO";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-analysis-dialog',
  templateUrl: './analysis-dialog.component.html',
  styleUrls: ['./analysis-dialog.component.css']
})
export class AnalysisDialogComponent implements OnInit {

  isTemplate = false;
  templateAnalyses: Analysis[] = [];
  selectedTemplate!: Analysis;
  analyseName: string = "";
  analysisDescription: string = "";
  analysisImage: string = "";

  onSubmit(): void {
    if (!this.isTemplate) {
      if (this.selectedTemplate === undefined) {
        this.snackbar.open('Please select a template', '', {duration: 5000});
      } else if (this.analyseName === "") {
        this.snackbar.open('Please input a name', '', {duration: 5000});
      } else if (this.analysisDescription === "") {
        this.snackbar.open('Please input a description', '', {duration: 5000});
      } else {
        const analysis: Analysis = new Analysis();
        analysis.title = this.analyseName;
        analysis.description = this.analysisDescription;
        analysis.image = this.analysisImage;

        let analysisDto = new AnalysisDTO();
        analysisDto.isTemplate = false;
        analysisDto.analysisName = analysis.title;
        analysisDto.analysisDescription = analysis.description;
        this.analysisRestService.deepCopy(this.selectedTemplate.id, analysisDto).subscribe(ana => {
          this.GoToStakeholder(ana.rootEntityID);
        });
      }
    }
  }

  constructor(
    public analysisDataService: AnalysisDataService,
    private analysisRestService: AnalysisRestService,
    private router: Router,
    private analysisDialogComponent: MatDialogRef<AnalysisDialogComponent>,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.isTemplate = data.isTemplate;
  }

  ngOnInit(): void {
    this.analysisDataService.analysisSaved.subscribe(analysis => {
      this.router.navigate(['/analysis'], {queryParams: {id: analysis.id}, queryParamsHandling: 'merge'});
    });
  }

  GoToStakeholder(analysisId: string): void {
    this.router.navigate(['/analysis'], {queryParams: {id: analysisId}, queryParamsHandling: 'merge'});
    this.analysisDialogComponent.close();
  }

  selectedTemplateChanged(analysis: Analysis) {
    if (this.isTemplate) {
      // Display values of the selected analysis template.

    }
  }
}
