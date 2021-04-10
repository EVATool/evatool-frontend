import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AnalysisDialogComponent} from '../analysis-dialog/analysis-dialog.component';
import {Analysis} from '../model/Analysis';
import {AnalysisRestService} from '../services/analysis/analysis-rest.service';
import {AnalysisDataService} from '../services/analysis/analysis-data.service';
import {ValueTemplateComponent} from '../value-template/value-template.component';

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

  createAnalysis(): void {
    const dialogRef = this.dialog.open(AnalysisDialogComponent, {data: {isTemplate: false}});
  }


  editTemplates(): void {
    const dialogRef = this.dialog.open(AnalysisDialogComponent, {data: {isTemplate: true}});
  }

  openValueDialog(analysis: Analysis): void {
    const valueDialogRef = this.dialog.open(ValueTemplateComponent, {data: {id: analysis.id}});
    console.log(analysis);
  }

  ngOnInit(): void {

  }

  analysisClick(analysis: Analysis): void {
    this.router.navigate(['/analysis'], {queryParams: {id: analysis.id}, queryParamsHandling: 'merge'});
  }

  changeBackgroundImage(): void {

  }

  deleteAnalysis(analysis: Analysis): void {
    this.analysisRestService.deleteAnalysis(analysis).subscribe((an) => {
      const index = this.analysisDataService.analysisArray.indexOf(an, 0);
      if (index > -1) {
        this.analysisDataService.analysisArray.splice(index, 1);
      }
    });
    window.location.reload();
  }

  save(analysis: Analysis): void {
    analysis.editable = !analysis.editable;
    this.analysisDataService.update(analysis);
  }
}
