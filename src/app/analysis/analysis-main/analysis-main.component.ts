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
  styleUrls: ['./analysis-main.component.scss']
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
    this.dialog.open(AnalysisDialogComponent, {data: {isTemplate: false}});
  }

  editTemplates(): void {
    this.dialog.open(AnalysisDialogComponent, {data: {isTemplate: true}});
  }

  openValueDialog(analysis: Analysis): void {
    this.dialog.open(ValueTemplateComponent, {data: {id: analysis.rootEntityID}});
    console.log(analysis);
  }

  ngOnInit(): void {

  }

  analysisClick(analysis: Analysis): void {
    this.router.navigate(['/analysis'], {queryParams: {id: analysis.rootEntityID}, queryParamsHandling: 'merge'});
  }

  changeBackgroundImage(analysis: Analysis): void {
    this.dialog.open(AnalysisDialogComponent, {data: {editImage: true, editedAnalysis: analysis}});
  }

  deleteAnalysis(analysis: Analysis): void {
    this.analysisDataService.deleteAnalysis(analysis);
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
