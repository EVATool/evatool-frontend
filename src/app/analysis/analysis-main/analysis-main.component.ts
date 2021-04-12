import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AnalysisDialogComponent} from "../analysis-dialog/analysis-dialog.component";
import {Analysis} from "../model/Analysis";
import {AnalysisRestService} from "../services/analysis/analysis-rest.service";
import {AnalysisDataService} from "../services/analysis/analysis-data.service";
import {ValueDialogComponent} from "../value-dialog/value-dialog.component";

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
    this.analysisDataService.loadAllAnalysis();
  }

  createAnalysis(): void {
    const dialogRef = this.dialog.open(AnalysisDialogComponent, {data: {isTemplate: false}});
  }

  editTemplates() {
    const dialogRef = this.dialog.open(AnalysisDialogComponent, {data: {isTemplate: true}});
  }

  openValueDialog(analysis: Analysis): void {
    const valueDialogRef = this.dialog.open(ValueDialogComponent, {data: {id: analysis.id}});
    console.log(analysis);
  }

  ngOnInit(): void {

  }

  analysisClick(analysis: Analysis): void {
    this.router.navigate(['/analysis'], {queryParams: {id: analysis.id}, queryParamsHandling: 'merge'});
  }

  changeBackgroundImage(analysis: Analysis): void {
    const dialogRef = this.dialog.open(AnalysisDialogComponent, {data: {editImage: true}});
  }

  deleteAnalysis(analysis: Analysis): void {
    console.log(analysis);
    this.analysisRestService.deleteAnalysis(analysis).subscribe((an) => {
      const index = this.analysisDataService.analysisArray.indexOf(an, 0);
      if (index > -1) {
        this.analysisDataService.analysisArray.splice(index, 1);
        this.analysisDataService.analyses.splice(index, 1);
      }
    });
    // TODO Deletion works but the UI is not updating.
    //  Calling window.location.reload causes the rest call to fail.
    //  The UI has to be reloaded in some other way.
  }

  saveTitle(analysis: Analysis): void {
    analysis.TitleIsEditable = !analysis.TitleIsEditable;
    this.analysisDataService.update(analysis);
  }

  saveDescription(analysis: Analysis): void {
    analysis.DescriptionIsEditable = !analysis.DescriptionIsEditable;
    this.analysisDataService.update(analysis);
  }
}
