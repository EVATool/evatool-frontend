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
  public templateAnalyses: Analysis[] = []
  public analyses: Analysis[] = []

  // imgs: any[] = [
  //   "https://images.pexels.com/photos/127513/pexels-photo-127513.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  //   "https://images.pexels.com/photos/631954/pexels-photo-631954.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  //   "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"]

  constructor(private analysisRestService: AnalysisRestService) {
  }

  save(analysis: Analysis): void {
    console.log(analysis.image);
    this.analysisRestService.createAnalysis({
        analysisName: analysis.title,
        analysisDescription: analysis.description,
        rootEntityID: analysis.id,
        analysisDate: null,
        isTemplate: analysis.isTemplate,
        image: analysis.image,
        uniqueString: '',
        date: ''

      }
    ).subscribe();
  }

  update(analysis: Analysis): void {
    this.analysisRestService.updateAnalysis({
      analysisName: analysis.title,
      analysisDescription: analysis.description,
      analysisDate: analysis.analysisDate,
      isTemplate: analysis.isTemplate,
      rootEntityID: analysis.id,
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
          id: analysisDTO.rootEntityID,
          description: analysisDTO.analysisDescription,
          title: analysisDTO.analysisName,
          analysisDate: '',
          image: analysisDTO.image,
          isTemplate: analysisDTO.isTemplate,
          uniqueString: '',
          titleIsEditable: false,
          descriptionIsEditable: false,
          date: analysisDTO.date
        };
        this.analysisArray.push(analysis);
      });

      this.templateAnalyses = this.analysisArray.filter(ana => ana.isTemplate);
      this.analyses = this.analysisArray.filter(ana => !ana.isTemplate);
    });
  }
}
