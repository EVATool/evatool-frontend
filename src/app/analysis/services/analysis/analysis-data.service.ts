import { Injectable, Output, EventEmitter } from '@angular/core';
import { AnalysisRestService } from "./analysis-rest.service";
import { Analysis } from "../../model/Analysis";
import {AnalysisDTO} from "../../model/AnalysisDTO";

@Injectable({
  providedIn: 'root'
})
export class AnalysisDataService {
  @Output() analysisSaved: EventEmitter<Analysis> = new EventEmitter<Analysis>();

  constructor(private analysisRestService: AnalysisRestService) { }

  save(analysis: Analysis): void{
    this.analysisRestService.createAnalysis(
      {analysisName: analysis.title, analysisDescription: analysis.description, rootEntityID: analysis.id}
      ).subscribe();
  }
}
