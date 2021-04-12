import {Injectable, Output, EventEmitter} from '@angular/core';
import {AnalysisRestService} from "./analysis-rest.service";
import {Analysis} from "../../model/Analysis";
import {AnalysisDTO} from "../../model/AnalysisDTO";

@Injectable({
  providedIn: 'root'
})
export class AnalysisDataService {
  @Output() analysisSaved: EventEmitter<Analysis> = new EventEmitter<Analysis>();
  public analysisArray: Analysis[] = [];
  public templateAnalyses: Analysis[] = [];
  public analyses: Analysis[] = [];

  constructor(private analysisRestService: AnalysisRestService) {
  }

  save(analysis: Analysis): void {
    console.log(analysis.image);
    this.analysisRestService.createAnalysis({
        analysisName: analysis.analysisName,
        analysisDescription: analysis.analysisDescription,
        rootEntityID: analysis.rootEntityID,
        lastUpdate: null,
        isTemplate: analysis.isTemplate,
        image: analysis.image,
        uniqueString: '',
        date: ''

      }
    ).subscribe();
  }

  update(analysis: Analysis): void {
    this.analysisRestService.updateAnalysis({
      analysisName: analysis.analysisName,
      analysisDescription: analysis.analysisDescription,
      lastUpdate: analysis.lastUpdate,
      isTemplate: analysis.isTemplate,
      rootEntityID: analysis.rootEntityID,
      uniqueString: analysis.uniqueString,
      image: analysis.image,
      date: analysis.date
    }).subscribe(() => {
      this.loadAllAnalysis();
    });
  }

  loadAllAnalysis(): void {
    this.analysisRestService.getAnalysis().subscribe((result: any) => {
      this.analysisArray = [];
      console.log(result);
      result.forEach((analysisDTO: AnalysisDTO) => {
        const analysis: Analysis = {
          rootEntityID: analysisDTO.rootEntityID,
          analysisDescription: analysisDTO.analysisDescription,
          analysisName: analysisDTO.analysisName,
          lastUpdate: '',
          image: analysisDTO.image,
          editImage: false,
          isTemplate: analysisDTO.isTemplate,
          uniqueString: '',
          TitleIsEditable: false,
          DescriptionIsEditable: false,
          date: analysisDTO.date
        };
        this.analysisArray.push(analysis);
      });

      this.templateAnalyses = this.analysisArray.filter(ana => ana.isTemplate);
      this.analyses = this.analysisArray.filter(ana => !ana.isTemplate);
    });
  }
}
