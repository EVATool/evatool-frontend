import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {AnalysisDataService} from '../services/analysis/analysis-data.service';
import {Analysis} from '../model/Analysis';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AnalysisRestService} from '../services/analysis/analysis-rest.service';
import {AnalysisDTO} from '../model/AnalysisDTO';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ValueTemplateComponent} from '../value-template/value-template.component';

@Component({
  selector: 'app-analysis-dialog',
  templateUrl: './analysis-dialog.component.html',
  styleUrls: ['./analysis-dialog.component.css']
})
export class AnalysisDialogComponent implements OnInit {
  @ViewChild(ValueTemplateComponent) valueTemplateComponent!: ValueTemplateComponent;

  isTemplate = false;
  editImage = false;
  selectedTemplate!: Analysis;
  analyseName = '';
  editedAnalysis!: Analysis;
  newImage = '';
  analysisDescription = '';
  analysisImage = '';

  onSubmit(): void {
    if (!this.isTemplate) {
      if (this.selectedTemplate === undefined && !this.editImage) {
        this.snackbar.open('Please select a template', '', {duration: 5000});
      } else if (this.analyseName === '' && !this.editImage) {
        this.snackbar.open('Please input a name', '', {duration: 5000});
      } else if (this.analysisDescription === '' && !this.editImage) {
        this.snackbar.open('Please input a description', '', {duration: 5000});
      } else if (this.editImage) {

        this.analysisRestService.updateAnalysis(
          {
            date: '',
            lastUpdate: '',
            image: this.newImage,
            rootEntityID: this.editedAnalysis.rootEntityID,
            uniqueString: this.editedAnalysis.uniqueString,
            analysisName: this.editedAnalysis.analysisName,
            analysisDescription: this.editedAnalysis.analysisDescription,
            isTemplate: false
          }).subscribe(
          res => console.log(res),
          err => console.log('err: ' + err.response),
          () => this.analysisDataService.loadAllAnalysis()
        );
      } else {
        const analysis: Analysis = new Analysis();
        analysis.analysisName = this.analyseName;
        analysis.analysisDescription = this.analysisDescription;
        analysis.image = this.analysisImage;

        const analysisDto = new AnalysisDTO();
        analysisDto.isTemplate = false;
        analysisDto.analysisName = analysis.analysisName;
        analysisDto.analysisDescription = analysis.analysisDescription;
        analysisDto.image = analysis.image;
        this.analysisRestService.deepCopy(this.selectedTemplate.rootEntityID, analysisDto).subscribe(ana => {
          this.GoToStakeholder(ana.rootEntityID);
        });
      }
    } else {
      this.analysisDialogComponent.close();
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
    this.editImage = data.editImage;

    if (this.editImage === undefined) {
      this.editImage = false;
    }

    if (data.editedAnalysis !== undefined) {
      this.editedAnalysis = data.editedAnalysis;
    }
  }

  ngOnInit(): void {
    this.analysisDataService.analysisSaved.subscribe(analysis => {
      this.router.navigate(['/analysis'], {queryParams: {id: analysis.rootEntityID}, queryParamsHandling: 'merge'});
    });
  }

  GoToStakeholder(analysisId: string): void {
    this.router.navigate(['/analysis'], {queryParams: {id: analysisId}, queryParamsHandling: 'merge'});
    this.analysisDialogComponent.close();
  }

  selectedTemplateChanged(analysis: Analysis): void {
    if (this.isTemplate) {
      // Display values of the selected analysis template.
      this.analyseName = analysis.analysisName;
      this.valueTemplateComponent.updateAnalysis(analysis.rootEntityID);
    }
  }

  newTemplate(): void {
    console.log('Create new template');
    const analysisDto = new AnalysisDTO();
    // analysisDto.image = this.selectedTemplate.image;
    // analysisDto.rootEntityID = null;
    // analysisDto.uniqueString = this.selectedTemplate.uniqueString;
    analysisDto.analysisName = 'Template';
    analysisDto.analysisDescription = 'Template';
    analysisDto.isTemplate = true;
    this.analysisRestService.createAnalysis(analysisDto).subscribe((anaDto: AnalysisDTO) => {
      const ana = AnalysisDataService.fromDto(anaDto);
      // this.analysisDataService.analyses.push(ana);
      this.analysisDataService.templateAnalyses.push(ana);
      this.selectedTemplate = ana;
    });
  }

  deleteTemplate(): void {
    console.log(this.analysisDataService.templateAnalyses.length);
    if (this.selectedTemplate === undefined && !this.editImage) {
      this.snackbar.open('Please select a template', '', {duration: 5000});
    } else if (this.analysisDataService.templateAnalyses.length == 1) {
      this.snackbar.open('You cannot delete the last template', '', {duration: 5000});
    } else {
      this.analysisRestService.deleteAnalysis(this.selectedTemplate).subscribe(a => {
        const index: number = this.analysisDataService.templateAnalyses.indexOf(this.selectedTemplate, 0);
        this.analysisDataService.templateAnalyses.splice(index, 1);
        this.selectedTemplate = this.analysisDataService.templateAnalyses[0];
      });
    }
  }

  analysisNameChanged(): void {
    if (this.isTemplate) {
      console.log('Update template name');
      const analysisDto = new AnalysisDTO();
      analysisDto.rootEntityID = this.selectedTemplate.rootEntityID;
      analysisDto.analysisName = this.analyseName;
      analysisDto.analysisDescription = this.selectedTemplate.analysisDescription;
      analysisDto.image = null;
      analysisDto.lastUpdate = null;
      analysisDto.isTemplate = this.selectedTemplate.isTemplate;
      analysisDto.uniqueString = null;
      this.analysisRestService.updateAnalysis(analysisDto).subscribe();
    }
  }
}
