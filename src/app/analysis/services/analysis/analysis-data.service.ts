import { Injectable } from '@angular/core';
import {AnalysisRestService} from "./analysis-rest.service";
import {Analysis} from "../../model/Analysis";

@Injectable({
  providedIn: 'root'
})
export class AnalysisDataService {

  constructor(private analysisRestService: AnalysisRestService) { }

  save(analysis: Analysis): void{
    this.analysisRestService.createAnalysis({analysisName: analysis.title, analysisDescription: analysis.description, rootEntityID: analysis.id}).subscribe();
  }
}
