import { Component, OnInit } from '@angular/core';
import { AnalysisDataService } from "../services/analysis/analysis-data.service";
import { AnalysisDTO } from "../model/AnalysisDTO";
import { Analysis } from "../model/Analysis";
import { analyticsPackageSafelist } from "@angular/cli/models/analytics";
import { Router } from "@angular/router";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-analysis-dialog',
  templateUrl: './analysis-dialog.component.html',
  styleUrls: ['./analysis-dialog.component.css']
})
export class AnalysisDialogComponent implements OnInit {
  analyseName: any;
  analysisDescription: any;
  analysisImage: any;

  onSubmit(): void {
    const analysis: Analysis = new Analysis();
    analysis.title = this.analyseName;
    analysis.description = this.analysisDescription;
    analysis.image = this.analysisImage;

    this.analysisDataService.save(analysis);
    this.GoToStakeholder();
  }

  constructor(
    private analysisDataService: AnalysisDataService,
    private router: Router,
    private analysisDialogComponent: MatDialogRef<AnalysisDialogComponent>) { }

  ngOnInit(): void {
    this.analysisDataService.analysisSaved.subscribe(analysis => {
      this.router.navigate(['/analysis'], { queryParams: { id: analysis.id }, queryParamsHandling: 'merge' });
    });
  }

  GoToStakeholder(): void {
    this.router.navigate(['/analysis']);
    this.analysisDialogComponent.close();
  }
}
