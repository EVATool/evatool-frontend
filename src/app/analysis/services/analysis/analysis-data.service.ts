import { Injectable, Output, EventEmitter } from '@angular/core';
import { AnalysisRestService } from "./analysis-rest.service";
import { Analysis } from "../../model/Analysis";

@Injectable({
  providedIn: 'root'
})
export class AnalysisDataService {
  @Output() analysisSaved: EventEmitter<Analysis> = new EventEmitter<Analysis>()

  constructor(private analysisRestService: AnalysisRestService) { }

  save(analysis: Analysis): void {
    this.analysisRestService.createAnalysis(
      {
        analysisName: analysis.title,
        analysisDescription: analysis.description,
        rootEntityID: analysis.id
      }).subscribe(analysisDto => {
        const analysis = new Analysis()
        analysis.id = analysisDto.rootEntityID
        analysis.title = analysisDto.analysisName
        analysis.description = analysisDto.analysisDescription
        this.analysisSaved.emit(analysis)
      });
  }
}
