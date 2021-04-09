import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AnalysisDialogComponent } from "../analysis-dialog/analysis-dialog.component";
import { Analysis } from "../model/Analysis";
import { AnalysisRestService } from "../services/analysis/analysis-rest.service";
import { AnalysisDataService } from "../services/analysis/analysis-data.service";
import { ValueDialogComponent } from "../value-dialog/value-dialog.component";
import {AnalysisDTO} from "../model/AnalysisDTO";
import {MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-analysis-main',
  templateUrl: './analysis-main.component.html',
  styleUrls: ['./analysis-main.component.css']
})
export class AnalysisMainComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private analysisRestService: AnalysisRestService,
    public analysisDataService: AnalysisDataService,
    private router: Router) {
    analysisDataService.loadAllAnalysis();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AnalysisDialogComponent, { data: { p: 'test', b: 'auch test' } });
  }

  openValueDialog(analysis: Analysis): void {
    const valueDialogRef = this.dialog.open(ValueDialogComponent, { data: { id: analysis.id} });
    console.log(analysis);
  }

  ngOnInit(): void {


  }

  analysisClick(analysis: Analysis): void {
    this.router.navigate(['/analysis'], { queryParams: { id: analysis.id }, queryParamsHandling: 'merge' });
  }

  changeBackgroundImage(): void {

  }

  deleteAnalysis(analysis: Analysis): void {
    this.analysisRestService.deleteAnalysis(analysis).subscribe((anal) => {
      const index = this.analysisDataService.analysisArray.indexOf(anal, 0);
      if (index > -1) {
        this.analysisDataService.analysisArray.splice(index, 1);
      }
      window.location.reload();
    });
  }

  save(analysis: Analysis): void {
    analysis.editable = !analysis.editable;
    this.analysisDataService.update(analysis);
  }
}
